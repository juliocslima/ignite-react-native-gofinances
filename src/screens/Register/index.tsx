import transaction from 'ethereumjs-tx/dist/transaction';
import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { 
  Container,
  ContainerButtons,
  Fields,
  Form,
  Header,
  Title,
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type);
  }

  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <ContainerButtons>
            <TransactionTypeButton 
              title="Income" 
              type='income'
              onPress={() => handleTransactionTypeSelect('income')}
              isActive={transactionType === 'income' ? true : false}
            />
            <TransactionTypeButton 
              title="Outcome"
              type="outcome"
              onPress={() => handleTransactionTypeSelect('outcome')}
              isActive={transactionType === 'outcome' ? true : false}
            />
          </ContainerButtons>

          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar"/>
      </Form>
    </Container>
  );
}