import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { selectConstants, selectPredicates, selectParsedConstants, selectParsedPredicates, updateCValue, updatePValue } from '../store/languageSlice';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import './Language.css';
import SyntErr from './SyntErr';
import { selectLanguage } from '../store/languageSlice';

const Language: React.FC = () => {
  const constants = useSelector(selectConstants);
  const predicates = useSelector(selectPredicates);
  const parsedConstants = useSelector(selectParsedConstants);
  const parsedPredicates = useSelector(selectParsedPredicates);
  //const [error, setError] = useState<SyntaxError | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { language, factories, error } = useSelector(selectLanguage); 

  if (parsedConstants.error) {
    console.log(parsedConstants.error);
  }

  if (parsedPredicates.error) {
    console.log(parsedPredicates.error);
  }

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
        <SyntErr inputString={constants} error={parsedConstants.error} />
        
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
        <SyntErr inputString={predicates} error={parsedPredicates.error} />

      </div>
    </div>

    
  );
};

export default Language;


