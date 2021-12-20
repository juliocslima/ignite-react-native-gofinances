import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { Card } from '../../components/Card';
import { 
  Container, 
  Header,
  HighlightCards,
  Photo,
  User,
  UserContainer,
  UserInfo,
  UserGretting,
  UserName,
  Icon,
} from './styles';

export function Dashboard() {

  return(
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/86537737?v=4'}}/>
            <User>
              <UserGretting>Olá</UserGretting>
              <UserName>Julio Lima</UserName>
            </User>
          </UserInfo>

          <Icon name="power"/>
        </UserContainer>
      </Header>

      <HighlightCards>
        <Card 
          type="income"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <Card 
          type="outcome"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <Card 
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>
    </Container>
  );
}