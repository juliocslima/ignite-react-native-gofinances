import React from 'react';

import { 
  Container,
  Footer,
  Title,
  Amount,
  TransactionCategory,
  TransactionIcon,
  TransactionName,
  TransactionDate,
} from './styles';

export interface Category {
  name: string;
  icon: string;
}

export interface Transaction {
  title: string;
  amount: string;
  type: 'income' | 'outcome';
  date: string;
  category: Category;
}

interface TransactionCardProps {
  data: Transaction;
}

export function TransactionCard({ data }: TransactionCardProps) {

    return(
      <Container>
        <Title>{data.title}</Title>
        <Amount type={data.type}>
          { data.type === 'outcome' && '- ' }
          {data.amount}
        </Amount>
        <Footer>
          <TransactionCategory>
            <TransactionIcon name={data.category.icon} />
            <TransactionName>{data.category.name}</TransactionName>
          </TransactionCategory>
          <TransactionDate>{data.date}</TransactionDate>

        </Footer>
      </Container>
    );
}