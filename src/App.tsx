import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Language from './components/Language';
import Formulas from './components/Formulas';
import Valuation from './components/Valuation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <Language />
        <Formulas />
        <Valuation />
      </div>
    </Provider>
  );
};

export default App;