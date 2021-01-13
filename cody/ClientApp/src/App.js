import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Layout } from './components/layout';
import { Login } from './pages/login/login';
import { SignUp } from './pages/sign_up/sign_up';
import { Error404Page } from './pages/error/error404_page';

import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            
            <Route component={Error404Page} />
          </Switch>
        </Router>
      </Layout>
    );
  }
}
