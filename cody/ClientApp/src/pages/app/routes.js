import React, { lazy, Suspense } from 'react';
import { Router, Switch} from 'react-router-dom';

import { UserContext } from "src/components/user_controller_context/user_controller_context";
import { CustomRoute } from "src/components/route_components/custom_route";

import history from 'src/history';
import Requests from 'src/lib/server_calls/requests';

const Login = lazy(() => import('src/pages/login/login'));
const SignUp = lazy(() => import('src/pages/sign_up/SignUp'));
const Error404Page = lazy(() => import('src/pages/message_pages/Error404Page'));
const EmailValidPage = lazy(() => import('src/pages/message_pages/email_valid_page/EmailValidPage'));
const UnauthorizedPage = lazy(() => import('src/pages/message_pages/UnauthorizedPage'));
const Home = lazy(() => import('src/pages/home/home'));
const Account = lazy(() => import('src/pages/account/account'));
const Test = lazy(() => import('src/pages/test'));
const AdminPage = lazy(() => import('src/pages/admin_pages/AdminPage'));
const CreateOrJoinOrganization = lazy(() => import('src/pages/create_or_join_organization/CreateOrJoinOrganizationPage'));
const OrganizationPage = lazy(() => import('src/pages/organization/OrganizationPage'));
const Form = lazy(() => import('src/pages/Form'));

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