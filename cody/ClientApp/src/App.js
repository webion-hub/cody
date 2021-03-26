import React, { Component, lazy, Suspense } from 'react';
import { Router, Redirect, Route, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';

import { MuiThemeProvider } from '@material-ui/core/styles';  
import { CssBaseline } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';

import { ThemeController } from "./lib/default_values/themes/theme_controller";
import { UserControllerContext } from "./components/user_controller_context/user_controller_context";
import { UserContext } from "./components/user_controller_context/user_controller_context";
import history from 'src/history'

import './custom.css';

const Login = lazy(() => import('./pages/login/Login'));
const SignUp = lazy(() => import('./pages/sign_up/SignUp'));
const Error404Page = lazy(() => import('./pages/message_pages/Error404Page'));
const EmailValidPage = lazy(() => import('./pages/message_pages/email_valid_page/EmailValidPage'));
const UnauthorizedPage = lazy(() => import('./pages/message_pages/UnauthorizedPage'));
const Home = lazy(() => import('./pages/home/Home'));
const Account = lazy(() => import('./pages/account/Account'));
const Test = lazy(() => import('./pages/Test'));
const AdminPage = lazy(() => import('./pages/admin_pages/AdminPage'));
const CreateOrJoinOrganization = lazy(() => import('./pages/create_or_join_organization/CreateOrJoinOrganizationPage'));

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
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <CustomRoute exact path='/' component={Home} />
          <CustomRoute path='/login' component={Login} redirect={isLogged}/>
          <CustomRoute path='/sign-up' component={SignUp} redirect={isLogged}/>
          <CustomRoute path='/email-verification' component={EmailValidPage} />
          <CustomRoute path='/access-denied' component={UnauthorizedPage} />
          <CustomRoute path='/account' component={Account} redirect={!isLogged}/>
          
          <CustomRoute path='/admin' component={AdminPage}/>
          <CustomRoute exact path='/organization' component={CreateOrJoinOrganization}/>

          <CustomRoute path='/test' component={Test}/>
          <CustomRoute component={Error404Page} />
        </Switch>
      </Suspense>
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