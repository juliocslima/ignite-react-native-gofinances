import styled from 'styled-components/native';
import { FlatList, TouchableOpacity } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

import { Transaction } from '../../@types/entities/Transaction';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background };
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(32)}px;

  background-color: ${({ theme }) => theme.colors.primary }

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const PhotoAvatarContainer = styled.View`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  background-color: ${({ theme }) => theme.colors.secondary}

  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const PhotoAvatarLetters = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserContainer = styled.View`
  width: 100%;

  padding: 0 ${RFValue(24)}px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserGretting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const LogoutButton = styled(TouchableOpacity)``;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`;

export const TransactionList = styled(
  FlatList as new () => FlatList<Transaction>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { 
    paddingBottom: getBottomSpace() 
  },
})``;

export const TransactionsListTitle = styled.View`
  width: 100%;

  flex-direction: row;
  margin-bottom: 5px;;
  
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;