/* eslint-disable indent */
import { createContext, useReducer, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { ActionTyping } from '../types/Action';

type AppContextType = {
  user?: {
    uid: string,
    displayName: string;
  },
  authIsReady?: boolean,
  dispatch: React.Dispatch<ActionTyping>,
};

export const AuthContext = createContext<AppContextType | null>(null);

export const authReducer = (state: {}, action: ActionTyping) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null };

    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
