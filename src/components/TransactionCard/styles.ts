import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface TransactionCardStyleProps {
  type: 'income' | 'outcome';
}

export const Container = styled.View`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.shape}

  padding: 17px 24px;  
  margin-top: 16px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 19px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular}
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text<TransactionCardStyleProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular}
  color: ${({ theme, type }) => 
    type === 'income' ? theme.colors.success : theme.colors.attention
  };

  margin-top: 5px;
`;

export const TransactionCategory = styled.View`
  flex-direction: row;

  align-items: center;
`;

export const TransactionIcon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const TransactionName = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular}
  color: ${({ theme }) => theme.colors.text};

  margin-left: 17px;
`;

export const TransactionDate = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular}
  color: ${({ theme }) => theme.colors.text};
`;