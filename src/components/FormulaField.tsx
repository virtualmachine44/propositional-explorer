import React from 'react';
import { FormulaState, selectParsedFormula, selectValuationCheck } from '../store/formulasSlice'
import { InlineMath, BlockMath } from 'react-katex';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

interface FormulaFieldProps {
  formula: FormulaState;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDropdownChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onRemove: () => void;
  index: number;
}

const FormulaField: React.FC<FormulaFieldProps> = ({ formula, index, onInputChange, onDropdownChange, onRemove }) => {
  const parsedFormulaWithValue = useSelector((state: RootState) => selectParsedFormula(state, index));
  const parsedFormula = parsedFormulaWithValue?.parsedFormula;
  //const { parsedFormula, error } = useSelector((state: RootState) => selectParsedFormula(state, index));
  const parsedFormulaString = parsedFormula?.toString();
  const parsedFormulaTex = parsedFormula?.toTex();
  const parsedFormulaError = parsedFormulaWithValue?.error?.message;
  const constantsArr = parsedFormula?.constants ? Array.from(parsedFormula.constants()) : [];

  //const valuationCheck = useSelector((state: RootState) => selectValuationCheck(state, index));
  const valuationCheck = useSelector((state: RootState) => selectValuationCheck(state, index));
  const valuationResult = valuationCheck?.result;
  const valuationError = valuationCheck?.error;

  return (
    <Container className="mb-3">
      <Row className="align-items-center">
        <Col md="auto">
          <Form.Label><InlineMath math={`A_{${index + 1}} =`} /></Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="text"
            maxLength={100}
            value={formula.value}
            onChange={onInputChange}
          />
        </Col>
        <Col md="auto">
          <Button variant="danger" onClick={onRemove}>-</Button>
        </Col>
        <Col md="auto">
          <Form.Label>
            <InlineMath math="v"/>&nbsp;
            <Form.Select value={formula.truthValue} onChange={onDropdownChange}>
              <option value="0/1">⊨ₚ/⊭ₚ</option>
              <option value="0">⊭ₚ</option> 
              <option value="1">⊨ₚ</option>
            </Form.Select>&nbsp;
            <InlineMath math={`A_{${index + 1}}`} />
          </Form.Label>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>toString method: {parsedFormulaString};</p>
          <p>toTex method: {parsedFormulaTex};</p>
          <p>error message: {parsedFormulaError};</p>
          <p>constants: {constantsArr.join(', ')}</p>
          <p style={{ margin: '10px 10px'}}>valuation check: {valuationCheck?.result}</p>
          {valuationError && <p style={{ color: 'red' }}>Error: {valuationError}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default FormulaField;