import React from 'react';
import { Card } from '../../components/Card';
import { TransactionCard } from '../../components/TransactionCard';
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
  Transactions,
  TransactionList,
  Title,
} from './styles';

import { Transaction } from '../../components/TransactionCard';

export interface TransactionListData extends Transaction {
  id: string;
}

export function Dashboard() {

  const transactions: TransactionListData[] = [
    {
      id: '1',
      title:"Desenvolvimento de site",
      amount:"R$ 12.000,00",
      type:"income",
      date:"13/04/2020",
      category:{
        name: 'Vendas',
        icon: 'dollar-sign'
      }
    },
    {
      id: '2',
      title:"Hamburgueria Pizzy",
      amount:"R$ 59,00",
      type:"outcome",
      date:"10/04/2020",
      category:{
        name: 'Alimentação',
        icon: 'coffee'
      }
    },
    {
      id: '3',
      title:"Aluguel do apartamento",
      amount:"R$ 1.200,00",
      type:"outcome",
      date:"15/04/2020",
      category:{
        name: 'Aluguel',
        icon: 'shopping-bag'
      }
    },
    {
      id: '4',
      title:"Hamburgueria Pizzy",
      amount:"R$ 59,00",
      type:"outcome",
      date:"10/04/2020",
      category:{
        name: 'Alimentação',
        icon: 'coffee'
      }
    },
  ]

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

          <Icon name="power"/>
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