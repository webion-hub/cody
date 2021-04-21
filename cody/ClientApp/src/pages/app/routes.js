import React, { Suspense } from 'react';
import { Router, Switch} from 'react-router-dom';

import { UserContext } from "src/components/user_controller_context/user_controller_context";
import { CustomRoute } from "src/components/route_components/custom_route";

import history from 'src/history';
import Requests from 'src/lib/server_calls/requests';
import { lazyWithRetry } from 'src/lib/lazy_with_retry';

const Login = lazyWithRetry(() => import('src/pages/login/login'));
const SignUp = lazyWithRetry(() => import('src/pages/sign_up/SignUp'));
const Error404Page = lazyWithRetry(() => import('src/pages/message_pages/Error404Page'));
const EmailValidPage = lazyWithRetry(() => import('src/pages/message_pages/email_valid_page/EmailValidPage'));
const UnauthorizedPage = lazyWithRetry(() => import('src/pages/message_pages/UnauthorizedPage'));
const Home = lazyWithRetry(() => import('src/pages/home/home'));
const Account = lazyWithRetry(() => import('src/pages/account/account'));
const Test = lazyWithRetry(() => import('src/pages/test'));
const AdminPage = lazyWithRetry(() => import('src/pages/admin_pages/AdminPage'));
const CreateOrJoinOrganization = lazyWithRetry(() => import('src/pages/create_or_join_organization/CreateOrJoinOrganizationPage'));
const OrganizationPage = lazyWithRetry(() => import('src/pages/organization/OrganizationPage'));
const Form = lazyWithRetry(() => import('src/pages/Form'));

export function Routes(){
  const { userState } = React.useContext(UserContext);
  const isLogged = userState === "logged"
  const isNotLogged = userState === "notLogged"

  Requests.onRedirect = (where) => {
    window.location.href = where;
  };

  return (
    <Router history={history}>
      <Suspense fallback={
        <div id="ringContainer" className="center dynamic-background">
          <div className="loader"></div>
        </div>
      }>
        <Switch>
          <CustomRoute exact path='/' component={Home} />
          <CustomRoute path='/login' component={Login} redirect={isLogged}/>
          <CustomRoute path='/sign-up' component={SignUp} redirect={isLogged}/>
          <CustomRoute path='/email-verification' component={EmailValidPage} />
          <CustomRoute path='/access-denied' component={UnauthorizedPage} />
          <CustomRoute path='/account' component={Account} redirect={isNotLogged}/>
          <CustomRoute exact path='/organization' component={CreateOrJoinOrganization}/>
          <CustomRoute exact path='/organization/:id' component={OrganizationPage}/>
          <CustomRoute exact path='/help-us' component={Form}/>
          
          <CustomRoute path='/admin' component={AdminPage}/>

          <CustomRoute path='/test' component={Test}/>
          <CustomRoute path='/index.html' redirect/>
          <CustomRoute component={Error404Page} />
        </Switch>
      </Suspense>
    </Router>
  );
}