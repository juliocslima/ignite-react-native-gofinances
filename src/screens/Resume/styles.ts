import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background };
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const ContentResume = styled.ScrollView``;

export const ChartContainer = styled.View`
  width: 100%;
  height: ${RFValue(300)}px;
  align-items: center;
`;

export const Month = styled.Text`
  font-family: ${ ({ theme }) => theme.fonts.regular };
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  margin-top: 41px;

`;

export const MonthSelectButton = styled(TouchableOpacity)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const MessageContent = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
`;

export const MessageIcon = styled(Feather)`
  font-size: ${RFValue(64)}px;
  color: ${({ theme }) => theme.colors.attention};

  margin-bottom: 24px;
`;