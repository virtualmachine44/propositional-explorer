import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { addFormulaField, removeFormulaField, updateFormulaValue, updateDropdownValue } from '../store/formulasSlice';
import FormulaField from './FormulaField';
import 'katex/dist/katex.min.css';
import { Button, Row, Col, Card } from 'react-bootstrap';

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
    <Card>
      <Card.Header>Formulas</Card.Header>
      <Card.Body>
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
      <Row className="mb-3">
        <Col>
          <Button variant="success" onClick={() => dispatch(addFormulaField())}>
            + Add
          </Button>
        </Col>
      </Row>
      </Card.Body>
      </Card>
  );
};

export default Formulas;