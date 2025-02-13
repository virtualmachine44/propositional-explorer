import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { selectLanguage } from './languageSlice';
import { RootState } from './store';
import { makeLanguageAndFactories } from '../lib/Factories';
import { parseConstants, parsePredicates, SyntaxError, parseFormulaStrict } from '@fmfi-uk-1-ain-412/js-fol-parser';
import { Formula } from '../lib/Formula';
import { selectValuation } from './valuationSlice';


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

const selectFormula = (state: RootState, index: number) => state.formulas.formulas[index]; 
const selectFormulas = (state: RootState) => state.formulas.formulas;
const selectFormulaCount = (state: RootState) => state.formulas.formulas.length;

export interface ParsedFormulaWithValue {
  parsedFormula?: Formula;
  truthValue?: boolean | null;
  error?: SyntaxError;
};


export const selectParsedFormula = createSelector(
  [selectFormula, selectLanguage, (state: RootState, index: number) => index],
  (formula, languageState, index): ParsedFormulaWithValue | undefined => {
    if (languageState.error) {
      return { error: languageState.error };
    }
    if (!languageState.language) {
      return { parsedFormula: undefined, truthValue: undefined, error: undefined};
    }
    if (!formula) {
      return { parsedFormula: undefined, truthValue: undefined,  error: undefined};
    }
    try {
      return {
        parsedFormula: parseFormulaStrict(formula.value, languageState.language, languageState.factories),
        truthValue: formula.truthValue === "1" ? true : formula.truthValue === "0" ? false : null
      };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { error };
      }
      throw error;
    }
  }
);


export const selectAtoms = createSelector(
  [selectFormulaCount, (state: RootState) => state],
  (formulasCount, state) => {
    const uniqueAtoms = new Set<string>();
    const errors: string[] = [];

    for (let i = 0; i < formulasCount; i++) {
      const parsedFormula = selectParsedFormula(state, i);
      if (parsedFormula?.error) {
        errors.push(parsedFormula.error.message);
        continue;
      }
      const atoms = parsedFormula?.parsedFormula?.atoms();
      if (atoms) {
        Array.from(atoms).forEach((atom: any) => uniqueAtoms.add(atom.toString()));
      }
    }

    return errors.length ? errors : Array.from(uniqueAtoms);
  }
);

//ak nie je urcene ci je formula (ne)pravdiva, hodit pripomienku
//(pri vyplneni inputu na formulu sa objavi dole novy input pre formulu) 

export const selectFormulaEvaluation = createSelector(
  [selectParsedFormula, selectValuation],
  (parsedFormula, valuationMap) => {
    if (!parsedFormula || !parsedFormula.parsedFormula) {
      return { };
    }
    
    const valuation = new Map<string, boolean | null>();
    Object.entries(valuationMap).forEach(([key, value]) => {
      valuation.set(key, value);
    });

    try {
      const formulaIsTrue = parsedFormula.parsedFormula.isTrue(valuation);
      return { formulaIsTrue };
    } catch (error) {
      return { error: (error as Error).message }; // vratte Error
    }
  }
);

export const selectValuationCheck = createSelector(
  [selectParsedFormula, selectFormulaEvaluation],
  (parsedFormula, evaluationResult) => {
    if (!parsedFormula || !parsedFormula.parsedFormula) {
      return { };
    }

    if (evaluationResult.error) {
      return { error: evaluationResult.error };
    }

    const formulaTruthValue = parsedFormula.truthValue;
    const formulaIsTrue = evaluationResult.formulaIsTrue;

    if (formulaTruthValue !== null) {
      if (formulaIsTrue === formulaTruthValue) {
        return { result: "Correct" };
      } else {
        return { result: "Incorrect" };
      }
    }
    return { result: formulaIsTrue };
  }
);


export default formulasSlice.reducer;