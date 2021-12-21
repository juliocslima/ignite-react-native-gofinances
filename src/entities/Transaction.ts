export type Transaction = {
  id: string;
  name: string;
  amount: string;
  type: 'income' | 'outcome';
  date: string;
  category: string;
}