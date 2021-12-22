import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { Card } from '../../components/Card';
import { TransactionCard } from '../../components/TransactionCard';
import { Transaction } from '../../entities/Transaction';

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

interface Summary {
  deposits: number;
  withdraws: number;
  total: number;
}

const collectionKey = '@gofinance:transaction';

export function Dashboard() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastTransactionDepositDate, setLastTransactionDepositDate] = useState('');
  const [lastTransactionWithdrawDate, setLastTransactionWithdrawDate] = useState('');
  const [summary, setSummary] = useState<Summary>({
    deposits: 0,
    withdraws: 0,
    total: 0
  });

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
    const response = await AsyncStorage.getItem(collectionKey);
    const database: Transaction[] = response ? JSON.parse(response) : [];

    try {
      handleDashboarSummary(database);

      setLastTransactionDepositDate(
        getLastTransactionDate(database, 'income')
      );
      
      setLastTransactionWithdrawDate(
        getLastTransactionDate(database, 'outcome')
      );
    } catch(error) {
      console.log(error);
    }
    

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
    loadTransactions();
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
          amount={
            summary.deposits.toLocaleString('pt-BR', { 
              style: 'currency', currency: 'BRL'}
            )
          }
          lastTransaction={"Última entrada dia " + lastTransactionDepositDate}
        />
        <Card 
          type="outcome"
          title="Saídas"
          amount={
            summary.withdraws.toLocaleString('pt-BR', { 
              style: 'currency', currency: 'BRL'}
            )
          }
          lastTransaction={"Última saída dia " + lastTransactionWithdrawDate}
        />
        <Card 
          type="total"
          title="Total"
          amount={
            summary.total.toLocaleString('pt-BR', { 
              style: 'currency', currency: 'BRL'}
            )
          }
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