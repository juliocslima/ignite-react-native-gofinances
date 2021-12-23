import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${ ({ theme }) => theme.colors.primary };

  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.shape};

  text-align: center;

  margin-top: ${RFValue(40)}px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};

  text-align: center;

  margin-bottom: ${RFValue(68)}px;
  margin-top: ${RFValue(80)}px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;

  background-color: ${ ({ theme }) => theme.colors.secondary };
`;

export const SignInSocialButtonContent = styled.View`
  width: 100%;

  padding: 0 ${RFValue(32)}px;
  margin-top: ${RFPercentage(-4)}px;

  justify-content: space-between;
`;
