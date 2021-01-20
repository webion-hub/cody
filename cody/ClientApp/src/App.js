import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Layout } from './components/layout';

import { Login } from './pages/login/login';
import { SignUp } from './pages/sign_up/sign_up';
import { Error404Page } from './pages/error404_page';
import { EmailValid } from './pages/email_valid';
import { Home } from './pages/home/home';

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
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
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

  let themeController = new ThemeController();
  let theme = themeController.getTheme();

  useEffect(() => {
    //execute before render
    themeController.setThemeMode(themeMode);
  }, []);
  
  return (
    <MuiThemeProvider theme = {theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
}