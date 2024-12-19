import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { selectLanguage } from './languageSlice';
import { RootState } from './store';
import { makeLanguageAndFactories } from '../lib/Factories';
import { parseConstants, parsePredicates, SyntaxError, parseFormulaStrict } from '@fmfi-uk-1-ain-412/js-fol-parser';
import { Formula } from '../lib/Formula';




export interface FormulaState {
  value: string;
  truthValue: string;
  //parsed value
  //error
  //namiesto selectora
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

const selectFormula = (state: RootState, index: number) => state.formulas.formulas[index]; 
const selectFormulas = (state: RootState) => state.formulas.formulas;

export const selectParsedFormula = createSelector(
  [selectLanguage, selectFormula],
  (languageState, formula) => {
    if (!languageState.language) {
      return { parsedFormula: null, error: new Error("Cannot parse formula with invalid language") };
    }   
    try {
      return { parsedFormula: parseFormulaStrict(formula.value, languageState.language, languageState.factories), error: null };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { parsedFormula: null, error };
      }
      throw error;
    }
  }
); // prerobit na (state: RootState, index: number) => selectParsedFormulas(state)[index]

//selector "vsetky parsed formuly"
export const selectParsedFormulas = createSelector(
  [selectFormulas, selectLanguage],
  (formulasFromState, languageState) => {
    if (!languageState.language) {
      return [];
    }
    return formulasFromState.map((formula: FormulaState) => {
      try {
        return { parsedFormula: parseFormulaStrict(formula.value, languageState.language, languageState.factories), error: null };
      } catch (error) {
        if (error instanceof SyntaxError) {
          return { parsedFormula: null, error };
        }
        throw error;
      }
    });
  }
);

//zo sparsovanych formul vyberie jednu na zaklade indexu
export const selectParsedFormula2 = (state: RootState, index: number) => selectParsedFormulas(state)[index];

//get atoms from parsed formulas as strings and return array
export const selectAtoms = createSelector(
  [selectParsedFormulas],
  (parsedFormulas) => {
    const uniqueAtoms = new Set<string>();

    parsedFormulas.forEach((formulaState: { parsedFormula: any; error: SyntaxError | null }) => {
      const atoms = formulaState.parsedFormula?.atoms();
      if (atoms) {
        Array.from(atoms).forEach((atom: any) => uniqueAtoms.add(atom.toString()));
      }
    });

    return Array.from(uniqueAtoms);
  }
);



export default formulasSlice.reducer;