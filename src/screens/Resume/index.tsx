import React, { useState, useCallback } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { HistoryCard } from "../../components/HistoryCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { useTheme } from "styled-components";
import { addMonths, subMonths } from 'date-fns';

import { Message } from '../../components/Message';

import {
  Container,
  Header,
  Title,
  ContentResume,
  ChartContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  LoadContainer,
} from './styles'

import { CATEGORIES } from '../../global/constants'
import { Transaction } from "../../@types/entities/Transaction";
import { useAuth } from "../../hooks/auth";

interface ResumeItem {
  key: string;
  name: string,
  color: string,
  amount: string,
  percent: string,
}

interface ItemResume {
  [index: string]: number;
}

interface Category {
  key: string;
  name: string;
  icon: string;
  color: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [showData, setShowData] = useState(false);
  const [resume, setResume] = useState<ResumeItem[]>();
  const [selectedDate, setSelectDate] = useState(new Date());
  const theme = useTheme();

  const { user } = useAuth();

  function handleChangeDate(action: 'previous' | 'next') {
    if(action === 'previous') {
      const newDate = subMonths(selectedDate, 1);
      setSelectDate(newDate);
    } else {
      const newDate = addMonths(selectedDate, 1);
      setSelectDate(newDate);
    }
  }
  
  function handleResume(items: ItemResume) {
    const categories: Category[] = CATEGORIES;

    const resumeInfo = categories.map(category => {
      if(items[category.key]) {
        return {
          key: category.key,
          name: category.name,
          color: category.color,
          amount: items[category.key],
          percent: 0
        }
      } else {
        return {
          key: category.key,
          name: category.name,
          color: category.color,
          amount: 0,
          percent: 0
        }
      }
    }).filter(resume => resume.amount > 0)

    const totalInfo = resumeInfo.reduce((acc: number, category) => {
      return acc + category.amount;
    }, 0)

    const resumeGraph: ResumeItem[] = resumeInfo.map(item => {
      return {
        key: item.key,
        name: item.name,
        color: item.color,
        amount: String(item.amount),
        percent: `${((Number(item.amount) / totalInfo) * 100).toFixed(0)}%`,
      }
    });

    if(totalInfo > 0) {
      setShowData(true);
    } else {
      setShowData(false);
    }

    console.log(resumeGraph);

    setResume(resumeGraph);
  }

  async function loadData() {

    setIsLoading(true);

    try {
      const storageTransactionKey = `@gofinances:transactions_user:${user.id}`;
      const database = await AsyncStorage.getItem(storageTransactionKey);
      const currentDatabase: Transaction[] = database ? JSON.parse(database) : [];

      let resumeData: ItemResume = {};

      currentDatabase.filter(
        item => item.type === 'outcome' &&
        new Date(item.date).getMonth() === selectedDate.getMonth() &&
        new Date(item.date).getFullYear() === selectedDate.getFullYear()
      ).map(item => {
        let amount = Number(item.amount)
        let category = item.category
          if (resumeData[category]) {
            resumeData[category] = Number(resumeData[category] ) + amount
          } else {
            resumeData[category] = amount;
          }
      });

      handleResume(resumeData);

      setIsLoading(false);

    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao carregar despesas deste mês.');
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  return(
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>  

      
      <MonthSelect>
        <MonthSelectButton onPress={() => handleChangeDate('previous')}>
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButton>

        <Month>
          {
            Intl.DateTimeFormat('pt-BR', {
              month: 'long', 
              year: 'numeric'
            }).format(new Date(selectedDate))
          }
        </Month>

        <MonthSelectButton onPress={() => handleChangeDate('next')}>
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButton>
      </MonthSelect>

      { isLoading ? 
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer>
          : (
          <>
            { showData ? (
              <>
              <ChartContainer>
                { resume && (
                  <VictoryPie 
                    data={resume}
                    colorScale={resume.map(category => category.color)}
                    width={RFValue(340)} height={RFValue(340)}
                    style={{
                      labels: { 
                        fontSize: RFValue(18),
                        fontWeight: 'bold',
                        fill: theme.colors.shape,
                      }
                    }}
                    labelRadius={50}
                    x="percent"
                    y="amount"
                  />
                ) }
              </ChartContainer>  

              <ContentResume
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 24,
                }}
              >
                { resume && resume.map(item => (
                  <HistoryCard key={item.key}
                    name={item.name}
                    amount={
                      Number(item.amount).toLocaleString('pt-BR', { 
                        style: 'currency', currency: 'BRL'})} 
                    color={item.color} 
                  />
                ))}
              </ContentResume>
              </>
            ) : (
              <Message 
                icon="x-octagon" 
                firstMessage="Não existem lançamentos" 
                secondMessage="para o período informado"
              />
            ) }
          </>
        )
      }
    </Container>
  );
}