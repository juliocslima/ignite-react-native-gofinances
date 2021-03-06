import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 1,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 8px;
  margin-bottom: 16px;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;

  padding: 24px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Fields = styled.View``;


