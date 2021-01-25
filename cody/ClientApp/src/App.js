import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';

import { Login } from './pages/login/login';
import { SignUp } from './pages/sign_up/sign_up';
import { Error404Page } from './pages/error404_page';
import { EmailValid } from './pages/email_valid';
import { Home } from './pages/home/home';

import { MuiThemeProvider } from '@material-ui/core/styles';  
import { CssBaseline } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';

import { ThemeController } from "./lib/default_values/themes/theme_controller";
import { UserControllerContext } from "./components/user_controller_context";

import './custom.css';

const themeController = new ThemeController();

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <UserControllerContext>
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
      </UserControllerContext>
    );
  }
}

function Theme(props){
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? "dark" : "light";

  return (
    <MuiThemeProvider theme = {themeController.getTheme(theme)}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
}