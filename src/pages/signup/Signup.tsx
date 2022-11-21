import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

import styles from './Signup.module.scss';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles['signup-form']}
    >
      <h2>Signup</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>displayed name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {!isPending && <button type="submit" className="btn">Sign Up</button>}
      {isPending && (
        <button type="button" className="btn" disabled>Loading</button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
