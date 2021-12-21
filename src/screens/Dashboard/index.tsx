import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { Card } from '../../components/Card';
import { TransactionCard } from '../../components/TransactionCard';
import { Transaction } from '../../components/TransactionCard';
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
  LogoutButton,
  Transactions,
  TransactionList,
  Title,
} from './styles';

const collectionKey = '@gofinance:transaction';

export function Dashboard() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(collectionKey);
    const database = response ? JSON.parse(response) : [];

    console.log(database);

    const transactionsFormatted: Transaction[] = database.map(
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
    )

    setTransactions(transactionsFormatted);
  }

  async function handleClearDatabase() {
    await AsyncStorage.removeItem(collectionKey);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return(
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/86537737?v=4'}}/>
            <User>
              <UserGretting>Olá</UserGretting>
              <UserName>Julio Lima</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={handleClearDatabase}>
            <Icon name="power"/>
          </LogoutButton>
        </UserContainer>
      </Header>

      <HighlightCards>
        <Card 
          type="income"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <Card 
          type="outcome"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <Card 
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item}/>}
        />
        
      </Transactions>
    </Container>
  );
}