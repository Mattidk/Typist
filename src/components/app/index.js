import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Selector from '../selector';
import Navigation from '../Navigation';
import Keyboard from '../keyboard';

const App = () => (
  <div>
    <Navigation />
    <main className="container content-spacer">
      <Route exact path="/" component={Selector} />
      <Route exact path="/learn" component={Home} />
      <Route exact path="/keyboard" component={Keyboard} />
    </main>
  </div>
);

export default App;
