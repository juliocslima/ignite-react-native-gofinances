import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface CardProps {
  type: 'income' | 'outcome' | 'total';
}

export const Container = styled.View<CardProps>`
  background-color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.secondary : theme.colors.shape
  };

  width: ${RFValue(300)}px;
  height: ${RFValue(200)}px;

  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<CardProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.title
  };
`;

export const Icon = styled(Feather)<CardProps>`
  font-size: ${RFValue(33)}px;

  ${({ type }) => type === 'income' && css`
    color: ${({ theme }) => theme.colors.success}
  `};

  ${({ type }) => type === 'outcome' && css`
    color: ${({ theme }) => theme.colors.attention}
  `};

  ${({ type }) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape}
  `};
`;

export const Content = styled.View`
  margin-top: 35px;
`;

export const Amount = styled.Text<CardProps>`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.title
  };
`;

export const LastTransaction = styled.Text<CardProps>`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.text
  };
`;