import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form
      className={styles['login-form']}
      onSubmit={handleSubmit}
    >
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button type="submit" className="btn">Login</button>}
      {isPending && (
        <button type="submit" className="btn" disabled>Loading</button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
