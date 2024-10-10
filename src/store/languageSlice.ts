import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
export default languageSlice.reducer;