import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { parseConstants, parsePredicates, SyntaxError } from '@fmfi-uk-1-ain-412/js-fol-parser';
import { RootState } from './store';
import { makeLanguageAndFactories } from '../lib/Factories';


interface LanguageState {
  constants: string;
  predicates: string;
}

const initialState: LanguageState = {
  constants: '',
  predicates: '',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    updateCValue(state, action: PayloadAction<string>) {
      state.constants = action.payload;
    },
    updatePValue(state, action: PayloadAction<string>) {
      state.predicates = action.payload;
    },
  },
});

export const { updateCValue, updatePValue } = languageSlice.actions;

export const selectConstants = (state: RootState) => state.language.constants;
export const selectPredicates = (state: RootState) => state.language.predicates;

export const selectParsedConstants = createSelector(
  [selectConstants],
  (constants) => {
    try {
      return { constants: parseConstants(constants), error: null };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { constants: null, error };
      }
      throw error;
    }
  }
);

export const selectParsedPredicates = createSelector(
  [selectPredicates],
  (predicates) => {
    try {
      return { predicates: parsePredicates(predicates), error: null };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { predicates: null, error };
      }
      throw error;
    }
  }
);

export const selectLanguage = createSelector(
  [selectParsedConstants, selectParsedPredicates],
  (parsedConstants, parsedPredicates) => {
    if (parsedConstants.error || parsedPredicates.error) {
      return {language: null, factories: null, error: parsedConstants.error ?? parsedPredicates.error};
    }
    
    const { language, factories } = makeLanguageAndFactories(parsedConstants.constants, parsedPredicates.predicates);

    return { language, factories, error: null };
  }

);


export default languageSlice.reducer;