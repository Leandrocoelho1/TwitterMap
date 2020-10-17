import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import 'normalize.css';

import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import { Layout } from './components/Layout';
import Stream from './views/Stream';
import Rules from './views/Rules';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Switch>
            <Route path="/" exact component={Stream} />
            <Route path="/rules" exact component={Rules} />
          </Switch>
        </AnimatePresence>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
