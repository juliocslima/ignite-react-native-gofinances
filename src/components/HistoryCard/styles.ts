import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface HistoryCardStyleProps {
  color: string;
}

export const Container = styled.View<HistoryCardStyleProps>`
  width: 100%;
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.shape};

  justify-content: space-between;
  align-items: center;

  border-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${props => props.color};
  padding: 13px 24px;
  margin: 8px 0;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;