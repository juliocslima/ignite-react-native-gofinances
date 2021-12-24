<!-- PROJECT SHIELDS -->

[![NPM](images/react-native-license.svg)](LICENSE)

<!-- PROJECT IMAGE -->
<br />
<p align="center">
  <a href="#">
    <img src="images/Capa.png" alt="Logo">
  </a>

  <h3 align="center">GoFinances</h3>
</p>

<!-- TABLE OF CONTENTS -->

## Tabela de Conteúdo

- [Tabela de Conteúdo](#tabela-de-conte%C3%BAdo)
- [Sobre o Projeto](#sobre-o-projeto)
  - [Tecnologias](#feito-com)
- [Começando](#come%C3%A7ando)
  - [Pré-requisitos](#pr%C3%A9-requisitos)
  - [Estrutura de Arquivos](#estrutura-de-arquivos)
  - [Instalação](#instala%C3%A7%C3%A3o)
    - [Passo Adicional no Android](#passo-adicional-no-android)
  - [Edição](#edi%C3%A7%C3%A3o)
- [Licença](#licen%C3%A7a)

<!-- ABOUT THE PROJECT -->

## Sobre o Projeto

GoFinances é um aplicativo de finanças que tem a proposta de gerenciar receitas e despesas de usuários mobile nas plataformas Android e IOS. Este projeto foi desenvolvido durante a trilha de React Native Ignite, da [Rocketseat](https://www.rocketseat.com.br/). Foi utilizada a plataforma do framework Expo Bare Workflow e várias tecnologias como: Armazenamento Local com Async Storage, Estilização com Styled Components Navegação, Formulários, Login Social e muito mais.

### Tecnologias

Abaixo segue o que foi utilizado na criação deste template:

- [React Native](http://facebook.github.io/react-native/) - O React Native é um framework que permite o desenvolvimento de aplicações mobile usando JavaScript e React;
- [React Navigation](https://reactnavigation.org/) - O React Navigation surgiu da necessidade comunidade do React Native de uma navegação de forma fácil de se usar, e escrita toda em JavaScript;
- [React Native Gesture Handler](https://kmagiera.github.io/react-native-gesture-handler/) - API declarativa que permite a manipulação de toques e gestos no React Native;
- [React Hook Form](https://react-hook-form.com/) - Performance e flexibilidade para trabalhar com formulários, inclui uma forma simples de trabalhar com validação, neste projeto foi utilizada também a biblioteca [YUP](https://github.com/jquense/yup);
- [Styled Components](https://styled-components.com/) - Utilizando tagged template literals (uma adição recente ao JavaScript) e o poder do CSS, os componentes estilizados permitem que você escreva o código CSS real para estilizar seus componentes;
- [React Native Iphone X Helper](https://github.com/ptelad/react-native-iphone-x-helper) - Biblioteca para auxílio no design de aplicativo para Iphone;
- [Babel](https://babeljs.io/) - O Babel é um compilador JavaScript gratuito e de código aberto e transpiler configurável usado no desenvolvimento de aplicações JavaScript;
  - [babel-eslint](https://github.com/babel/babel-eslint) - Este pacote é um _wrapper_ do parser do Babel para o ESLint;
- [ESLint](https://eslint.org/) - O ESLint é uma ferramenta de lint plugável para JavaScript e JSX;
  - [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) - Este pacote fornece o .eslintrc do Airbnb como uma configuração compartilhada extensível;
  - [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) - Plugin do ESLint com regras para ajudar na validação de imports;
  - [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) - Verificador estático AST das regras do a11y em elementos JSX;
  - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) - Regras de linting do ESLint específicas do React;
  - [eslint-plugin-react-native](https://github.com/Intellicode/eslint-plugin-react-native) - Regras de linting do ESLint específicas do React Native;
  - [eslint-import-resolver-babel-plugin-root-import](https://github.com/olalonde/eslint-import-resolver-babel-root-import) - Um resolver da lib _babel-root-import_ para a lib _eslint-plugin-import_;
- [Victory Native](https://formidable.com/open-source/victory/docs/native/) - Biblioteca para criação de gráficos;
- [Prettier](https://prettier.io/) - O Prettier atualiza seu código automaticamente seguindo os padrões que você quiser toda vez salva o arquivo;
  - [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) - Roda o Prettier como uma regra do ESLint;
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) - Desativa todas as regras que são desnecessárias ou que podem dar conflito com o Prettier;
- [EditorConfig](https://editorconfig.org/) - O EditorConfig é um formatador de arquivos e coleções em forma de Plugin para Editores de código/texto com o objetivo de manter um padrão de código consistente entre diferentes editores, IDE's ou ambientes;

<!-- GETTING STARTED -->

## Começando

Para conseguir utilizar o template, seja através do React Native CLI ou com uma cópia local dos arquivos, siga os passos abaixo.

### Pré-requisitos

Antes de seguirmos para as configurações e uso do template, é ideal que você tenha o ambiente configurado para criar e testar aplicativos em React Native, para isso você pode seguir o guia do link abaixo:

[Ambiente React Native (Android/iOS)](https://github.com/Rocketseat/ambiente-react-native)

### Estrutura Principal de Arquivos

A estrutura de arquivos está da seguinte maneira:

```bash
ignite-react-native-gofinances
├── android
├── ios
├── src/
│   ├── @types/
│   │   ├── entities/
│   │   │   └── transactions.ts
│   │   └── svg/
│   │       └── index.d.ts
│   ├── assets/
│   │   └── icons/
│   │       ├── apple/
│   │       │   ├── apple.svg
│   │       │   ├── apple@2x.png
│   │       │   └── apple@3x.png
│   │       ├── google/
│   │       │   ├── google.svg
│   │       │   ├── google@2x.png
│   │       │   └── google@3x.png
│   │       └── logo.svg
│   ├── components/
│   │
│   ├── global/
│   │   ├── constants/
│   │   └── styles/
│   ├── hooks/
│   │   └── auth.tsx
│   ├── routes/
│   └── screens/
│       ├── CategorySelect
│       ├── Dashboard
│       ├── Register
│       ├── Resume
│       └── SignIn
├── .buckconfig
├── .env.example
├── .gitattributes
├── .gitignore
├── App.tsx
├── LICENSE
├── app.json
├── babel.config.js
├── eas.json
├── index.js
├── metro.config.js
├── package.json
├── tsconfig.json
└── yarn.lock
```

Serão explicados os arquivos e diretórios na seção de [Edição](#edição).

### Instalação

1. Para instalar e utilizar esse template o processo é bem simples, basta instalar todas as dependências com o comando:

```sh
yarn
```

2. É importante também criar uma conta na [EXPO](https://expo.dev/), é fácil e gratuíto, será necessário para configuração do Login Social nas plataformas Google e Apple

Com isso o projeto será criado com todas as dependências devidamente instaladas e linkadas, tal como os arquivos de configuração que são copiados para o projeto.

---

#### Passo Adicional no Android

Para que os gestos sejam habilitados no Android é necessário um passo a mais, que é bem simples, abra o arquivo `android/app/src/main/java/<pacote_do_projeto>/MainActivity.java`, e comece importando os pacotes como abaixo:

```java
// ...
import com.facebook.react.ReactActivity;
// Importações adicionadas
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
```

Feito a importação vamos criar um método novo, logo abaixo do `getMainComponentName()`, ficando:

```java
public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() { ... }
  // Método adicionado
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
```

---

### Edição

Fique a vontade para copiar e alterar o projeto, o limite é a imaginação!

<!-- LICENSE -->

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
