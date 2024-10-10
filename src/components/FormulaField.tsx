import React from 'react';
import { FormulaState } from '../store/formulasSlice'
import { InlineMath, BlockMath } from 'react-katex';

interface FormulaFieldProps {
  formula: FormulaState;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDropdownChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onRemove: () => void;
  index: number;
}

const FormulaField: React.FC<FormulaFieldProps> = ({ formula, index, onInputChange, onDropdownChange, onRemove }) => {

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

    </div>
  );
};

export default FormulaField;