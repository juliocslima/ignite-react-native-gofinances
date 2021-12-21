import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'; 
import { TouchableOpacity } from 'react-native';

interface TransactionTypeButtonsStyleProps {
  type: 'income' | 'outcome';
  isActive: boolean;
}

export const Container = styled(TouchableOpacity)<TransactionTypeButtonsStyleProps>`
  flex: 1;
  flex-direction: row;
  
  padding: 18px;
  border: 1.5px solid ${({ theme, type, isActive }) => 
    isActive ? type === 'income' ? theme.colors.success_light : theme.colors.attention_light : theme.colors['gray.500']
  };
  border-radius: 5px;
  margin: 8px;

  background-color: ${({ theme, type, isActive }) => 
    isActive ? type === 'income' ? theme.colors.success_light : theme.colors.attention_light : theme.colors.background
  }
`;

export const Icon = styled(Feather)<TransactionTypeButtonsStyleProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type}) => 
    type === 'income' ? theme.colors.success : theme.colors.attention
  };
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title}

  margin-left: 14px;
`;