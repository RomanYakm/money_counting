import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import styles from './Home.module.scss';
import TransactionForm from './TransactionForm';
import TransactionsList from './TransactionsList';

export default function Home() {
  const { user } = useAuthContext();
  let userUid = '';

  if (user) {
    userUid = user.uid;
  }

  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', userUid],
    ['createdAt', 'desc'],
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionsList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        {user && <TransactionForm uid={user.uid} />}
      </div>
    </div>
  );
}
