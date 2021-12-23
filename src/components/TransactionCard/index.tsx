import React from 'react';
import { categories } from '../../utils/categories';

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

import { Transaction } from '../../@types/entities/Transaction';

interface TransactionCardProps {
  data: Transaction;
}

export function TransactionCard({ data }: TransactionCardProps) {
    const [ category ] = categories.filter(
      item => item.key === data.category
    );

    return(
      <Container>
        <Title>{data.name}</Title>
        <Amount type={data.type}>
          { data.type === 'outcome' && '- ' }
          {data.amount}
        </Amount>
        <Footer>
          <TransactionCategory>
            <TransactionIcon name={category.icon} />
            <TransactionName>{category.name}</TransactionName>
          </TransactionCategory>
          <TransactionDate>{data.date}</TransactionDate>

        </Footer>
      </Container>
    );
}