import React from 'react';
import { FormulaState, selectParsedFormula } from '../store/formulasSlice'
import { InlineMath, BlockMath } from 'react-katex';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface FormulaFieldProps {
  formula: FormulaState;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDropdownChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onRemove: () => void;
  index: number;
}

const FormulaField: React.FC<FormulaFieldProps> = ({ formula, index, onInputChange, onDropdownChange, onRemove }) => {

  const { parsedFormula, error } = useSelector((state: RootState) => selectParsedFormula(state, index));
  const parsedFormulaString = parsedFormula?.toString();
  const parsedFormulaTex = parsedFormula?.toTex();
  const parsedFormulaError = error?.message;
  const constantsArr = parsedFormula?.constants ? Array.from(parsedFormula.constants()) : [];

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <label style={{ marginRight: '10px' }}><InlineMath math={`A_{${index + 1}} =`} /></label>
      <input
        type="text"
        maxLength={100}
        value={formula.value}
        onChange={onInputChange}
        style={{ marginRight: '10px' }}
      />
      <button onClick={onRemove} style={{ marginRight: '50px' }}> - </button>
      <label>
      <InlineMath math="v"/>&nbsp;
      <select value={formula.truthValue} onChange={onDropdownChange}>
        <option value="0/1">⊨ₚ/⊭ₚ</option>
        <option value="0">⊭ₚ</option> 
        <option value="1">⊨ₚ</option>
      </select>&nbsp;
      <InlineMath math={`A_{${index + 1}}`} />
      </label>
      <p style={{ margin: '10px 10px'}}>toString method: {parsedFormulaString};</p>
      <p style={{ margin: '10px 10px'}}>toTex method: {parsedFormulaTex};</p>
      <p style={{ margin: '10px 10px'}}>error message: {parsedFormulaError};</p>
      <p style={{ margin: '10px 10px'}}>constants: {constantsArr.join(', ')}</p>

    </div>
  );
};

export default FormulaField;