import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import formulasReducer from './formulasSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
    formulas: formulasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;