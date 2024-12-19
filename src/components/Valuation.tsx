import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { selectAtoms } from '../store/formulasSlice';
import { selectValuation, updateValuation } from '../store/valuationSlice';

const Valuation: React.FC = () => {
  const dispatch = useDispatch();
  const atoms = useSelector((state: RootState) => selectAtoms(state));
  const valuation = useSelector((state: RootState) => selectValuation(state));

  const handleChange = (predicate: string, value: string) => {
    const booleanValue = value === '1' ? true : value === '0' ? false : null;
    dispatch(updateValuation({ predicate, value: booleanValue }));
  };

  return (
    <div>
      <h1>Valuation</h1>
      <table>
        <thead>
          <tr>
            <th>Atoms</th>
            <th>Valuation</th>
          </tr>
        </thead>
        <tbody>
          {atoms.map((atom, index) => (
            <tr key={index}>
              <td>{atom}</td>
              <td>
                <select
                  value={valuation[atom] === true ? 1 : valuation[atom] === false ? 0 : undefined}
                  onChange={(e) => handleChange(atom, e.target.value)}
                >
                  <option value={undefined}>⊨ₚ/⊭ₚ</option>
                  <option value={1}>⊭ₚ</option>
                  <option value={0}>⊨ₚ</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Valuation;