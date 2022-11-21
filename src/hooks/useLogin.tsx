import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      dispatch({ type: 'LOGIN', payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err: any) {
      const errorMessage: string = err.message;

      setError(errorMessage);
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};
