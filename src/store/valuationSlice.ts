import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Valuation } from '../lib/Formula';

interface ValuationState {
  valuation: Valuation;
}

const initialState: ValuationState = {
  valuation: {},
};

const valuationSlice = createSlice({
  name: 'valuation',
  initialState,
  reducers: {
    updateValuation(state, action: PayloadAction<{ predicate: string; value: boolean | null }>) {
      state.valuation[action.payload.predicate] = action.payload.value;
    }
  }
});

export const { updateValuation } = valuationSlice.actions;

export default valuationSlice.reducer;

export const selectValuation = (state: RootState) => state.valuation.valuation;


