import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.less';

import Header from './components/Header';
import Nav from './components/Nav';
import Counters from './components/Counters';
import Toolbar from './components/Toolbar';

import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="wrapper-cp">
          <Header/>
          <Nav/>
          <Counters/>
          <Toolbar/>
        </div>
      </Provider>
    );
  }
}

export default App;
