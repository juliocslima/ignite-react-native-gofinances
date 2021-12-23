import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from "styled-components";

import { Card } from '../../components/Card';
import { TransactionCard } from '../../components/TransactionCard';
import { Transaction } from '../../@types/entities/Transaction';
import { CalendarSelectButton } from '../../components/Form/CalendarSelectButton';

import { 
  Container, 
  Header,
  HighlightCards,
  Photo,
  User,
  UserContainer,
  UserInfo,
  UserGretting,
  UserName,
  Icon,
  LoadContainer,
  LogoutButton,
  Transactions,
  TransactionList,
  TransactionsListTitle,
  Title,
} from './styles';

import { Message } from '../../components/Message';

interface Summary {
  deposits: number;
  withdraws: number;
  total: number;
}

import { COLLECTION_KEY } from '../../global/constants';
import { useAuth } from '../../hooks/auth';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastTransactionDepositDate, setLastTransactionDepositDate] = useState('');
  const [lastTransactionWithdrawDate, setLastTransactionWithdrawDate] = useState('');
  const [summary, setSummary] = useState<Summary>({
    deposits: 0,
    withdraws: 0,
    total: 0
  });  

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const theme = useTheme();
  const { user, signOut } = useAuth();

  function handleDashboarSummary(transactions: Transaction[]) {
    const resume = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.deposits += Number(transaction.amount);
        acc.total += Number(transaction.amount);
      } else {
        acc.withdraws -= Number(transaction.amount);
        acc.total -= Number(transaction.amount);
      }
  
      return acc;
    }, {
      deposits: 0,
      withdraws: 0, 
      total: 0,
    });

    if(resume.total === 0) {
      setShowData(false);
    } else  {
      setShowData(true);
    }

    setSummary(resume);
  }

  function getLastTransactionDate(
    transactions: Transaction[], 
    type: 'income' | 'outcome'
  ) {
    const lastTransactionDate = Math.max.apply(Math, transactions
      .filter((transaction: Transaction) => transaction.type === type)
      .map((transaction: Transaction) => new Date(transaction.date). getTime())
    );

    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', 
      month: 'long'
    }).format(new Date(lastTransactionDate));
  }

  async function loadTransactions() {

    setIsLoading(true);

    const response = await AsyncStorage.getItem(COLLECTION_KEY);
    const database: Transaction[] = response ? JSON.parse(response) : [];

    const transactionsFiltered: Transaction[] = database.filter( transaction =>
      new Date(transaction.date).getFullYear() === date.getFullYear() &&
      new Date(transaction.date).getMonth() === date.getMonth() &&
      new Date(transaction.date).getDay() >= 1 &&
      new Date(transaction.date).getDay() <= date.getDay()
    )

    try {
      handleDashboarSummary(transactionsFiltered);

      setLastTransactionDepositDate(
        getLastTransactionDate(transactionsFiltered, 'income')
      );
      
      setLastTransactionWithdrawDate(
        getLastTransactionDate(transactionsFiltered, 'outcome')
      );
    } catch(error) {
      console.log(error);
    }

    const transactionsFormatted: Transaction[] = transactionsFiltered.map(
      (transaction: Transaction) => {
        const amount = Number(transaction.amount)
          .toLocaleString('pt-BR', { 
            style: 'currency', currency: 'BRL'}
          );

        const dateFormatted = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric'
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date: dateFormatted,
        }
      }
    );

    setTransactions(transactionsFormatted);
    setIsLoading(false);
  }

  async function handleClearDatabase() {
    await AsyncStorage.removeItem('@gofinance:transaction');
    await AsyncStorage.removeItem('@gofinance:user');
    loadTransactions();
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    console.log(selectedDate);
  };

  const showMode = (currentMode: 'date' | 'datetime' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const toggleDatepicker = () => {
    if(show) {
      setShow(false);
    } else {
      showMode('date');
    }
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, [date]));

  return(
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/86537737?v=4'}}/>
            <User>
              <UserGretting>Olá</UserGretting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={signOut}>
            <Icon name="power"/>
          </LogoutButton>
        </UserContainer>
      </Header>

      { isLoading ? (
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer>
         ) : (
          <>

          <HighlightCards>
            <Card 
              type="income"
              title="Entradas"
              amount={
                summary.deposits.toLocaleString('pt-BR', { 
                  style: 'currency', currency: 'BRL'}
                )
              }
              lastTransaction={showData ? `Última entrada dia ${lastTransactionDepositDate}` : ''}
            />
            <Card 
              type="outcome"
              title="Saídas"
              amount={
                summary.withdraws.toLocaleString('pt-BR', { 
                  style: 'currency', currency: 'BRL'}
                )
              }
              lastTransaction={showData ? `Última saída dia ${lastTransactionWithdrawDate}` : ''}
            />
            <Card 
              type="total"
              title="Total"
              amount={
                summary.total.toLocaleString('pt-BR', { 
                  style: 'currency', currency: 'BRL'}
                )
              }
              lastTransaction={`01 à ${
                  Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: 'long'
                  }).format(date)
                }`}
            />
          </HighlightCards>

          
          <Transactions>
            <TransactionsListTitle>
              <Title>Listagem</Title>
              <CalendarSelectButton 
                title={
                  Intl.DateTimeFormat('pt-BR', {
                    month: 'long',
                    year: 'numeric'
                  }).format(date)
                }
                onPress={toggleDatepicker} 
              />
            </TransactionsListTitle>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

            { showData ? (
              <TransactionList 
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item}/>}
              />
            ) : (
              <Message 
                icon="x-octagon" 
                firstMessage="Não existem lançamentos" 
                secondMessage="para o período informado"
              />
            ) }
        </Transactions>
            
          
        </>
        )
      }
    </Container>
  );
}