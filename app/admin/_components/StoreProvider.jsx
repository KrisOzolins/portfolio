'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../../../store';
import { setUser } from '@/store/slices/appSlice';

// todo: TS me.
export default function StoreProvider({ children, currentUser }) {
  const storeRef = useRef();

  if (!storeRef.current) {
    // console.log('Creating store for the first time:', currentUser);

    // Create the store instance the first time this renders.
    storeRef.current = makeStore();

    // If we have a user, set it in the store.
    if (currentUser) {
      // storeRef.current.dispatch({ type: 'SET_USER', payload: currentUser });
      storeRef.current.dispatch(setUser(currentUser));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
