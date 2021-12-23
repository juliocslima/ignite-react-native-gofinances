import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.9,
})`
  width: 100%;
  height: ${RFValue(56)}px;

  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.shape };

  align-items: center;
  border-radius: 5px;

  margin-bottom: ${RFValue(16)}px;
`;

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
  border-color: ${ ({ theme }) => theme.colors.background };
  border-right-width: 1px;
`;

export const Title = styled.Text`
  flex: 1;
  
  font-family: ${({ theme }) => theme.fonts.medium}
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title}

  text-align: center;
`;