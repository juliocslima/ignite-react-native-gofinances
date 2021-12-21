import React, { useState } from 'react';
import { Modal, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Form/InputForm';

import { 
  Container,
  ContainerButtons,
  Fields,
  Form,
  Header,
  Title,
} from './styles';

interface FormData {
  name: string;
  amount: number;
}

const schema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório'),
  amount: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.replace(/,/g, '.')))
    .typeError('Valor deve ser numérico')
    .positive('Valor deve ser positivo')
    .required('Valor é obrigatório'),
}).required();

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const { control, handleSubmit, formState: { errors }  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    Keyboard.dismiss();
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleSendTransaction(form: FormData) {
    if(!transactionType) {
      Alert.alert("Selecione o tipo de transação.");
    }

    if(category.key === 'category') {
      Alert.alert("Selecione a categoria da transação.");
    }

    let newAmount = form.amount.toString();
    newAmount = newAmount.replace(',', '.')

    if(errors) {
      console.log
    }

    const data = {
      name: form.name,
      amount: Number(newAmount),
      transactionType,
      category: category.key
    }

    console.log(data);
  }

  return(
    <TouchableWithoutFeedback onPress={() => Alert.alert('Pressed!')}>
    <Container onPress={Keyboard.dismiss}>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm 
            placeholder="Nome"
            name="name" 
            control={control}
            autoCapitalize='sentences'
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />

          <InputForm 
            placeholder="Preço" 
            name="amount" 
            control={control} 
            keyboardType='numeric'
            error={errors.amount && errors.amount.message}
          />

          <ContainerButtons>
            <TransactionTypeButton 
              title="Entradas" 
              type='income'
              onPress={() => handleTransactionTypeSelect('income')}
              isActive={transactionType === 'income' ? true : false}
            />
            <TransactionTypeButton 
              title="Saídas"
              type="outcome"
              onPress={() => handleTransactionTypeSelect('outcome')}
              isActive={transactionType === 'outcome' ? true : false}
            />
          </ContainerButtons>

          <CategorySelectButton 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button 
          title="Enviar"
          onPress={handleSubmit(handleSendTransaction)}
        />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
    </TouchableWithoutFeedback>
  );
}