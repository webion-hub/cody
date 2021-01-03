import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Layout } from './components/layout';
import { Login } from './pages/login';
import { SignUp } from './pages/sign_up/sign_up';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Router>
          <Route exact path='/login' component={Login} />
          <Route path='/sign-up' component={SignUp} />
        </Router>
      </Layout>
    );
  }
}
