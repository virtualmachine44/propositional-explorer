import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { addFormulaField, removeFormulaField, updateFormulaValue, updateDropdownValue } from '../store/formulasSlice';
import FormulaField from './FormulaField';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Formulas: React.FC = () => {
  const formulas = useSelector((state: RootState) => state.formulas.formulas);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormulaValue({ index, value: e.target.value }));
  };

  const handleDropdownChange = (index: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateDropdownValue({ index, value: e.target.value }));
  };

  const handleRemove = (index: number) => () => {
    dispatch(removeFormulaField(index));
  };

  return (
    <Container>
      <h1>Formulas</h1>
      {formulas.map((formula, index) => (
        <FormulaField
          key={index}
          formula={formula}
          index={index}
          onInputChange={handleInputChange(index)}
          onDropdownChange={handleDropdownChange(index)}
          onRemove={handleRemove(index)}
        />
      ))}
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={() => dispatch(addFormulaField())}>
            Add Formula
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Formulas;