import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { selectParsedFormula } from './formulasSlice';

interface ValuationState {
  //[predicate: string]: boolean | null;
  valuation: { [key: string]: boolean | null };
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
    },
  },
});

export const { updateValuation } = valuationSlice.actions;

export const selectValuation = (state: RootState) => state.valuation.valuation;

export default valuationSlice.reducer;



