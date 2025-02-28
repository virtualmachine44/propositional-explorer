import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectConstants, selectPredicates, selectParsedConstants, selectParsedPredicates, updateCValue, updatePValue } from '../store/languageSlice';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import SyntErr from './SyntErr';
import { selectLanguage } from '../store/languageSlice';
import { Form, Row, Col, InputGroup, Card } from 'react-bootstrap';

const Language: React.FC = () => {
  const constants = useSelector(selectConstants);
  const predicates = useSelector(selectPredicates);
  const parsedConstants = useSelector(selectParsedConstants);
  const parsedPredicates = useSelector(selectParsedPredicates);
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector(selectLanguage);

  if (parsedConstants.error) {
    console.log(parsedConstants.error);
  }

  if (parsedPredicates.error) {
    console.log(parsedPredicates.error);
  }

  if (error) {
    console.log(error);
  }

  return (
    <Card>
      <Card.Header>Language</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form.Group controlId="constantsInput" className='mb-3'>
              <Form.Label>
                Individual constants
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>
                  <InlineMath math="\mathcal{C}_\mathcal{L} = \{" />
                </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={constants}
                    onChange={(e) => dispatch(updateCValue(e.target.value))}
                    className="input-field"
                    isInvalid={!!parsedConstants.error}
                  />
                <InputGroup.Text>
                  <InlineMath math="\}" />
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  <SyntErr inputString={constants} error={parsedConstants.error} />
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="predicatesInput" className='mb-3'>
              <Form.Label>
                Predicate symbols
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>
                  <InlineMath math="\mathcal{P}_\mathcal{L} = \{" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={predicates}
                  onChange={(e) => dispatch(updatePValue(e.target.value))}
                  className="input-field"
                  isInvalid={!!parsedPredicates.error}
                />
                <InputGroup.Text>
                  <InlineMath math="\}" />
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  <SyntErr inputString={predicates} error={parsedPredicates.error} />
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Language;