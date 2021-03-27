import React, { Component, lazy, Suspense } from 'react';
import { Router, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';

import { UserControllerContext } from "./components/user_controller_context/user_controller_context";
import { UserContext } from "./components/user_controller_context/user_controller_context";
import { CustomRoute } from "./components/route_components/custom_route";
import history from 'src/history'

import Requests from 'src/lib/requests';

import './custom.css';
import { AlertDialog } from './components/dialogs/alert_dialog';
import { PageController } from './lib/page_controller';

const Login = lazy(() => import('./pages/login/Login'));
const SignUp = lazy(() => import('./pages/sign_up/SignUp'));
const Error404Page = lazy(() => import('./pages/message_pages/Error404Page'));
const EmailValidPage = lazy(() => import('./pages/message_pages/email_valid_page/EmailValidPage'));
const UnauthorizedPage = lazy(() => import('./pages/message_pages/UnauthorizedPage'));
const Home = lazy(() => import('./pages/home/Home'));
const Account = lazy(() => import('./pages/account/account'));
const Test = lazy(() => import('./pages/test'));
const AdminPage = lazy(() => import('./pages/admin_pages/AdminPage'));
const CreateOrJoinOrganization = lazy(() => import('./pages/create_or_join_organization/CreateOrJoinOrganizationPage'));


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <UserControllerContext>
        <Layout>
          <Routes/>
        </Layout>
      </UserControllerContext>
    );
  }
}

function Routes(){
  const [errorsDialog, setErrorsDialog] = React.useState("")
  const { userState } = React.useContext(UserContext);
  const isLogged = userState === "logged"
  const isNotLogged = userState === "notLogged"

  Requests.onError = (reason) => {
    setErrorsDialog(reason)
    console.log(reason)
  };
  

  return (
    <Router history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <CustomRoute exact path='/' component={Home} />
          <CustomRoute path='/login' component={Login} redirect={isLogged}/>
          <CustomRoute path='/sign-up' component={SignUp} redirect={isLogged}/>
          <CustomRoute path='/email-verification' component={EmailValidPage} />
          <CustomRoute path='/access-denied' component={UnauthorizedPage} />
          <CustomRoute path='/account' component={Account} redirect={isNotLogged}/>
          
          <CustomRoute path='/admin' component={AdminPage}/>
          <CustomRoute exact path='/organization' component={CreateOrJoinOrganization}/>

          <CustomRoute path='/test' component={Test}/>
          <CustomRoute component={Error404Page} />
        </Switch>
      </Suspense>      
      <AlertDialog
        open={errorsDialog !== ""}
        onClose={() => PageController.refresh()}
        buttonLabel="Ricarica la pagina"
      >
        {errorsDialog}
      </AlertDialog>
    </Router>
  );
}