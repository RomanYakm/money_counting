/* eslint-disable indent */
import { useReducer } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';
import { ActionTyping } from '../types/Action';

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state: any, action: ActionTyping) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };

    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case 'DELETED_DOCUMENT':
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

type DocTyping = {
  uid: string,
  name: string,
  amount: string,
};

export const useFirestore = (collection: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const ref = projectFirestore.collection(collection);
  const addDocument = async (doc: DocTyping) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });

      dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument });
    } catch (err: any) {
      const errorMessage: string = err.message;

      dispatch({ type: 'ERROR', payload: errorMessage });
    }
  };

  const deleteDocument = async (id: string) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await ref.doc(id).delete();
      dispatch({ type: 'DELETED_DOCUMENT' });
    } catch (err: any) {
      dispatch({ type: 'ERROR', payload: 'Could not delete' });
    }
  };

  return { addDocument, deleteDocument, response };
};
