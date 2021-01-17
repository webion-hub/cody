import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Layout } from './components/layout';
import { Login } from './pages/login/login';
import { SignUp } from './pages/sign_up/sign_up';
import { Error404Page } from './pages/error/error404_page';
import { EmailValid } from './pages/email_valid';

import { MuiThemeProvider } from '@material-ui/core/styles';  
import { CssBaseline } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';

import { ThemeController } from "./lib/default_values/themes/theme_controller";

import './custom.css';


export default class App extends Component {
  static displayName = App.name;
  render () {
    return (
      <Theme>
        <Layout>
          <Router>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route path='/sign-up' component={SignUp} />
              <Route path='/email-valid' component={EmailValid} />

              <Route component={Error404Page} />
            </Switch>
          </Router>
        </Layout>
      </Theme>
    );
  }
}

function Theme(props){
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themeMode = prefersDarkMode ? "dark" : "light";

  const themeController = new ThemeController();
  themeController.setThemeMode(themeMode);

  return (
    <MuiThemeProvider theme = {themeController.getTheme()}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
}