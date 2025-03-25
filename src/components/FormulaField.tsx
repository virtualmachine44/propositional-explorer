import React from 'react';
import { FormulaState, selectParsedFormula, selectValuationCheck } from '../store/formulasSlice'
import { InlineMath } from 'react-katex';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Trash3Fill } from 'react-bootstrap-icons';
import Err from './Err';

interface FormulaFieldProps {
  formula: FormulaState;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDropdownChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onRemove: () => void;
  index: number;
}

const FormulaField: React.FC<FormulaFieldProps> = ({ formula, index, onInputChange, onDropdownChange, onRemove }) => {
  const parsedFormulaWithValue = useSelector((state: RootState) => selectParsedFormula(state, index));

  const parsedFormulaError = parsedFormulaWithValue?.error?.message;

  const valuationCheck = useSelector((state: RootState) => selectValuationCheck(state, index));
  const valuationResult = valuationCheck?.result;
  const valuationError = valuationCheck?.error || null;

  const isValuationCorrect = valuationResult === 'Correct';
  const isValuationIncorrect = valuationResult === 'Incorrect';

  const formulaError = parsedFormulaWithValue?.error || null;

  if (valuationResult && !valuationError) {
    console.log(valuationResult);
  }


  return (
    <div>
      <Row className="align-items-top, mt-3">
      <Col>
          <Form.Group className='mb-3'>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <InlineMath math={`A_{${index + 1}} =`} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={formula.value}
                onChange={onInputChange}
                isInvalid={!!parsedFormulaError || !!valuationError}
              />
              <Button variant="danger" onClick={onRemove}>
                <Trash3Fill />
              </Button>
              <Form.Control.Feedback type="invalid">
                <Err inputString={null} errors={[formulaError, valuationError]} />
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>        

        <Col md="auto">
          <Form.Group className='mb-3'>
            <InputGroup>
              <InputGroup.Text>
                <InlineMath math="v" />
              </InputGroup.Text>
              <Form.Select
                value={formula.truthValue}
                onChange={onDropdownChange}
              >
                <option value="0/1">⊨ₚ/⊭ₚ</option>
                <option value="0">⊭ₚ</option>
                <option value="1">⊨ₚ</option>
              </Form.Select>
              <InputGroup.Text>
                <InlineMath math={`A_{${index + 1}}`} />
              </InputGroup.Text>
            </InputGroup>
            {isValuationIncorrect && (
              <div style={{ color: 'red', marginBottom: '1rem' }}>
                {valuationResult}
              </div>
            )}
            {isValuationCorrect && (
              <div style={{ color: 'green', marginBottom: '1rem' }}>
                {valuationResult}
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default FormulaField;