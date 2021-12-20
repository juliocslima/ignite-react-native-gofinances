import React from 'react';
import { Text } from 'react-native';

interface WelcomeProps {
  title: string;
}

export function Welcome({ title }: WelcomeProps) {
  return (
    <Text>{title}</Text>
  );
}