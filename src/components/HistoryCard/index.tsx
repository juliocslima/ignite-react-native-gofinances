import React from 'react';

import {
  Amount,
  Container,
  Title,
} from './styles'

interface ResumeData {
  key: string;
  name: string,
  color: string,
  amount: string,
}

export function HistoryCard({ color, name, amount }: ResumeData) {

  return(
    <Container color={color}>
      <Title>{name}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}