import React, { useEffect } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

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

  const { signInWithGoogle, user } = useAuth();

  useEffect(() => {
    if(user) {
      Alert.alert(user.email);
      console.log(user);
    }
  }, [user])
  
  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch(err) {
      console.log(err);
      Alert.alert('Não foi possível conectar com a conta Google');
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
          <SignInSocialButton title="Entrar com Google" svg={GoogleLogo} onPress={handleSignInWithGoogle}/>
          <SignInSocialButton title="Entrar com Apple" svg={AppleLogo} />
        </SignInSocialButtonContent>
      </Footer>

    </Container>
  );
}