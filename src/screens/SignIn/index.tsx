import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import AppleLogo from '../../assets/icons/apple/apple.svg';
import GoogleLogo from '../../assets/icons/google/google.svg';
import AppLogo from '../../assets/icons/logo.svg';

import { SignInSocialButton } from "../../components/SignInSocialButton";

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  SignInSocialButtonContent,
} from './styles';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();
  
  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch(err) {
      console.log(err);
      Alert.alert('Não foi possível conectar com a conta Google');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      await signInWithApple();
    } catch(err) {
      console.log(err);
      Alert.alert('Não foi possível conectar com a conta Apple');
      setIsLoading(false);
    } 
  }

  return(
    <Container>
      <Header>
        <TitleWrapper>
          <AppLogo
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>
            Controle suas{'\n'}
            finanças de forma{'\n'}
            muito simples 
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <SignInSocialButtonContent>
          <SignInSocialButton 
            title="Entrar com Google" 
            svg={GoogleLogo} 
            onPress={handleSignInWithGoogle}
          />

          { Platform.OS === 'ios' &&
            <SignInSocialButton 
              title="Entrar com Apple" 
              svg={AppleLogo} 
              onPress={handleSignInWithApple}
            />
          }
        </SignInSocialButtonContent>

        { isLoading && <ActivityIndicator color={theme.colors.primary} size="large" /> }
      </Footer>
    </Container>
  );
}