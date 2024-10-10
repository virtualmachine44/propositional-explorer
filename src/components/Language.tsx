import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { updateCValue, updatePValue } from '../store/languageSlice';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import './Language.css';

const Language: React.FC = () => {
  const constants = useSelector((state: RootState) => state.language.constants);
  const predicates = useSelector((state: RootState) => state.language.predicates);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Language</h1>
      <div className="input-container">
        <label>
        <InlineMath math="\mathcal{C}_\mathcal{L} =" />
        </label>
        <input
          type="text"
          maxLength={100}
          value={constants}
          onChange={(e) => dispatch(updateCValue(e.target.value))}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <InlineMath math="\mathcal{P}_\mathcal{L} =" />
        <input
          type="text"
          maxLength={100}
          value={predicates}
          onChange={(e) => dispatch(updatePValue(e.target.value))}
          className="input-field"
        />
      </div>
    </div>
  );
};

export default Language;