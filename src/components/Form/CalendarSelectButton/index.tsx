import React from 'react';

import {
  Container,
  Category,
  Icon
} from './styles';

interface CalendarSelectButtonProps {
  title: string;
  onPress: () => void;
}

export function CalendarSelectButton({ title, onPress }: CalendarSelectButtonProps) {

    return(
      <Container onPress={onPress}>
        <Category>{title}</Category>
        <Icon name="arrow-down"/>
      </Container>
    );
}