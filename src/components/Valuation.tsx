import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../store/store';
import { selectAtoms } from '../store/formulasSlice';
import { selectValuation, updateValuation} from '../store/valuationSlice';
import { Table, Container, Row, Col, Form } from 'react-bootstrap';


const Valuation: React.FC = () => {
  const dispatch = useDispatch();
  const atoms = useSelector((state: RootState) => selectAtoms(state));
  const valuation = useSelector((state: RootState) => selectValuation(state));

  const handleChange = (predicate: string, value: string) => {
    const booleanValue = value === '1' ? true : value === '0' ? false : null;
    dispatch(updateValuation({ predicate, value: booleanValue }));
  };

  return (
    <Container>
      <h1>Valuation</h1>
      <Table striped bordered hover>
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
              <Form.Select
                  value={valuation[atom] === true ? 1 : valuation[atom] === false ? 0 : undefined }
                  onChange={(e) => handleChange(atom, e.target.value)}
                >
                  <option value={undefined}>?</option>
                  <option value={0}>f</option>
                  <option value={1}>t</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Valuation;