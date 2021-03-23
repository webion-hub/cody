import React, { Component } from 'react';
import { Router, Redirect, Route, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';

import { Login } from './pages/login/login';
import { SignUp } from './pages/sign_up/sign_up';
import { Error404Page } from './pages/message_pages/error404_page';
import { EmailValidPage } from './pages/message_pages/email_valid_page/email_valid_page';
import { UnauthorizedPage } from './pages/message_pages/unauthorized_page';
import { Home } from './pages/home/home';
import { Account } from './pages/account/account';
import { Test } from './pages/test';
import { AdminPage } from './pages/admin_pages/admin_page';
import { CreateOrJoinOrganization } from './pages/create_or_join_organization/create_or_join_organization_page';

import { MuiThemeProvider } from '@material-ui/core/styles';  
import { CssBaseline } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';

import { ThemeController } from "./lib/default_values/themes/theme_controller";
import { UserControllerContext } from "./components/user_controller_context";
import { UserContext } from "./components/user_controller_context";
import history from 'src/history'

import './custom.css';

const themeController = new ThemeController();

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <UserControllerContext>
        <Theme>
          <Layout>
            <Routes/>
          </Layout>
        </Theme>
      </UserControllerContext>
    );
  }
}

function Routes(){
  const { isLogged } = React.useContext(UserContext);

  return (
    <Router history={history}>
      <Switch>
        <CustomRoute exact path='/' component={Home} />
        <CustomRoute path='/login' component={Login} redirect={isLogged}/>
        <CustomRoute path='/sign-up' component={SignUp} redirect={isLogged}/>
        <CustomRoute path='/validate-email' component={EmailValidPage} />
        <CustomRoute path='/access-denied' component={UnauthorizedPage} />
        <CustomRoute path='/account' component={Account} redirect={!isLogged}/>
        
        <CustomRoute path='/admin' component={AdminPage}/>
        <CustomRoute exact path='/organization' component={CreateOrJoinOrganization}/>


        <CustomRoute path='/test' component={Test}/>
        <CustomRoute component={Error404Page} />
      </Switch>
    </Router>
  );
}

function CustomRoute(props){
  return (
    <div>
      {
        props.redirect ? (
          <Redirect to={props.redirectTo? props.redirectTo : '/'}/>
        ):(
          <Route 
            exact={props.exact}
            path={props.path} 
            component={props.component} 
          />
        )
      }
    </div>
  );
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