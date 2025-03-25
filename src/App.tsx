import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Language from './components/Language';
import Formulas from './components/Formulas';
import Valuation from './components/Valuation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Container, Row, Col } from 'react-bootstrap';
// import TestErr from './components/TestErr';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <Container className="py-4">
        <div className="mb-3">
            <Language />
          </div>
          <div className="mb-3">
            <Formulas />
          </div>
          <div className="mb-3">
            <Valuation />
          </div>
        </Container>
      </div>
      {/* <div>
            <h1>Test Err Component</h1>
            <TestErr />
        </div> */}
    </Provider>
  );
};

export default App;