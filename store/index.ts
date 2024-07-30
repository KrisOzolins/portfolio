import { configureStore, combineReducers, combineSlices } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';

const store = {
  reducer: {
    app: appReducer,
  },
};

export default configureStore(store);

export const makeStore = () => {
  return configureStore(store)
}

// Infer the type of makeStore.
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself.
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
