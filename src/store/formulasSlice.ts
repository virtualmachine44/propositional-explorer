import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormulaState {
  value: string;
  truthValue: string;
}

interface FormulasState {
  formulas: FormulaState[];
}

const initialState: FormulasState = {
  formulas: [
    { value: '', truthValue: "0/1" }
  ],
};

const formulasSlice = createSlice({
  name: 'formulas',
  initialState,
  reducers: {
    addFormulaField(state) {
      state.formulas.push({ value: '', truthValue: "0/1" });
    },
    removeFormulaField(state, action: PayloadAction<number>) {
      state.formulas.splice(action.payload, 1);
    },
    updateFormulaValue(state, action: PayloadAction<{ index: number; value: string }>) {
      state.formulas[action.payload.index].value = action.payload.value;
    },
    updateDropdownValue(state, action: PayloadAction<{ index: number; value: string }>) {
      state.formulas[action.payload.index].truthValue = action.payload.value;
    },
  },
});

export const { addFormulaField, removeFormulaField, updateFormulaValue, updateDropdownValue } = formulasSlice.actions;
export default formulasSlice.reducer;