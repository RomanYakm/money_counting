import { useFirestore } from '../../hooks/useFirestore';
import styles from './Home.module.scss';

export default function TransactionsList({ transactions }: any) {
  const { deleteDocument } = useFirestore('transactions');

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction: any) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>
            $
            {transaction.amount}
          </p>
          <button
            type="submit"
            onClick={() => deleteDocument(transaction.id)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
