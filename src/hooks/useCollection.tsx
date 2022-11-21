import { useState, useEffect, useRef } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (
  collection: string,
  _query: any[],
  _orderBy: any[],
) => {
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref: any = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsubscribe = ref.onSnapshot((snapshot: any) => {
      const results: any[] = [];

      snapshot.docs.forEach((doc: any) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      setDocuments(results);
      setError(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }, (errors: any) => {
      setError('Could not fetch the data');
    });

    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error };
};
