import React, { useEffect, useState } from 'react';
import { Modal, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native'

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

import { Transaction } from '../../entities/Transaction';

interface FormData {
  name: string;
  amount: number;
}

const collectionKey = '@gofinance:transaction';

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
  const [transactionType, setTransactionType] = useState<'income' | 'outcome'>('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const navigation = useNavigation();

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const { control, handleSubmit, reset, formState: { errors }  } = useForm({
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

  async function handleSendTransaction(form: FormData) {
    if(!transactionType) {
      Alert.alert("Selecione o tipo de transação.");
    }

    if(category.key === 'category') {
      Alert.alert("Selecione a categoria da transação.");
    }

    const newTransaction: Transaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: String(form.amount),
      type: transactionType,
      category: category.key,
      date: String(new Date())
    }

    try {
      const database = await AsyncStorage.getItem(collectionKey);
      const currentDatabase: Transaction[] = database ? JSON.parse(database) : [];
      
      let transactions: Transaction[] = [];

      currentDatabase.length > 0 ?  (
        transactions = [
          ...currentDatabase,
          newTransaction
        ]
      ): (
        transactions.push(newTransaction)
      )

      await AsyncStorage.setItem(collectionKey, JSON.stringify(transactions));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });
      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar a transação.');
    }
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