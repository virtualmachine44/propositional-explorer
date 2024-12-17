import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { selectLanguage } from './languageSlice';
import { RootState } from './store';
import { makeLanguageAndFactories } from '../lib/Factories';
import { parseConstants, parsePredicates, SyntaxError, parseFormulaStrict } from '@fmfi-uk-1-ain-412/js-fol-parser';



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

//const selectFormulas = (state: RootState) => state.formulas.formulas;

const selectFormula = (state: RootState, index: number) => state.formulas.formulas[index];


export const selectParsedFormula = createSelector(
  [selectLanguage, selectFormula],
  (languageState, formula) => {
    //function parseTerm<Term>(input: string, language: Language, factories: TermFactories<Term>): Term
    // prejst vsetky formuly z pola a vytvorit nove pole s parsedFormulami
    // vrati pole so sparsovanymi formulami
    if (!languageState.language) {
      return { parsedFormula: null, error: new Error("Cannot parse formula with invalid language") };
    }   
    try {
      return { parsedFormula: parseFormulaStrict(formula.value, languageState.language, languageState.factories), error: null };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { parsedFormula: null, error: new Error("Cannot parse formula with invalid language") };
      }
      throw error;
    }
  }
);

export default formulasSlice.reducer;