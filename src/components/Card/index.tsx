import React from 'react';

import { 
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction,
} from './styles';

interface CardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: 'income' | 'outcome' | 'total';
}

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
  total: 'dollar-sign',
}

export function Card({ type, title, amount, lastTransaction}: CardProps) {

  return(
    <Container type={type}>
      <Header>
        <Title type={type}>
          {title}
        </Title>
        <Icon 
          name={icon[type]} 
          type={type} 
        />
      </Header>

      <Content>
        <Amount type={type}>
          {amount}
        </Amount>
        <LastTransaction type={type}>
          {lastTransaction}
        </LastTransaction>
      </Content>
    </Container>
  );
}