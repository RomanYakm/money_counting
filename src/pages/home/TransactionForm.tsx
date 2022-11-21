import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

type Props = {
  uid: string,
};

export default function TransactionForm({ uid }: Props) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { addDocument, response } = useFirestore('transactions');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      amount,
    });
  };

  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button type="submit">Add Transaction</button>
      </form>
    </>
  );
}