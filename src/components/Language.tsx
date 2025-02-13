import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { selectConstants, selectPredicates, selectParsedConstants, selectParsedPredicates, updateCValue, updatePValue } from '../store/languageSlice';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import SyntErr from './SyntErr';
import { selectLanguage } from '../store/languageSlice';
import { Form, Container, Row, Col } from 'react-bootstrap';

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

  if (error) {
    console.log(error)
  }

  return (
    <Container>
      <h1>Language</h1>
      <Row className="input-container">
        <Col>
          <Form.Group controlId="constantsInput">
            <Form.Label>
              <InlineMath math="\mathcal{C}_\mathcal{L} =" />
            </Form.Label>
            <Form.Control
              type="text"
              maxLength={100}
              value={constants}
              onChange={(e) => dispatch(updateCValue(e.target.value))}
              className="input-field"
            />
            <SyntErr inputString={constants} error={parsedConstants.error} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="input-container">
        <Col>
          <Form.Group controlId="predicatesInput">
            <Form.Label>
              <InlineMath math="\mathcal{P}_\mathcal{L} =" />
            </Form.Label>
            <Form.Control
              type="text"
              maxLength={100}
              value={predicates}
              onChange={(e) => dispatch(updatePValue(e.target.value))}
              className="input-field"
            />
            <SyntErr inputString={predicates} error={parsedPredicates.error} />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default Language;