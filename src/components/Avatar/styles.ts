import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

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

  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;