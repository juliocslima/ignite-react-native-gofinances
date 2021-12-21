import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

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
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const { control, handleSubmit, formState: { errors }  } = useForm();

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleSendTransaction(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  }

  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm placeholder="Nome" name="name" control={control}/>
          <InputForm placeholder="Preço" name="amount" control={control} />

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
  );
}