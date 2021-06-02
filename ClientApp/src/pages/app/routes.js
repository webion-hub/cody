import React, { Suspense } from 'react';
import { Router, Switch} from 'react-router-dom';

import { UserContext } from "src/components/global_contexts/user_controller_context/user_controller_context";
import { CustomRoute } from "src/components/utilities/custom_route";

import history from 'src/history';
import Requests from 'src/lib/server_calls/requests';
import { lazyLoader } from 'src/components/utilities/lazy_loader';

const Login = lazyLoader(() => import('src/pages/login/login'));
const SignUp = lazyLoader(() => import('src/pages/sign_up/SignUp'));
const Error404Page = lazyLoader(() => import('src/pages/message_pages/Error404Page'));
const EmailValidPage = lazyLoader(() => import('src/pages/message_pages/email_valid_page/EmailValidPage'));
const UnauthorizedPage = lazyLoader(() => import('src/pages/message_pages/UnauthorizedPage'));
const Home = lazyLoader(() => import('src/pages/home/home'));
const Account = lazyLoader(() => import('src/pages/account/account'));
const Test = lazyLoader(() => import('src/pages/test'));
const AdminPage = lazyLoader(() => import('src/pages/admin_pages/AdminPage'));
const CreateOrJoinOrganization = lazyLoader(() => import('src/pages/create_or_join_organization/CreateOrJoinOrganizationPage'));
const OrganizationPage = lazyLoader(() => import('src/pages/organization/OrganizationPage'));
const Course = lazyLoader(() => import('src/pages/course/Course'));
const Form = lazyLoader(() => import('src/pages/Form'));

export function Routes(){
  const { userState, role } = React.useContext(UserContext);
  const isLogged = userState === "logged"
  const isNotLogged = userState === "notLogged"
  const isAdmin = role === "Admin" || userState === "loading"
  const isNotAdmin = !isAdmin

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
          <CustomRoute exact path='/organization/:organizationId' component={OrganizationPage}/>
          <CustomRoute exact path='/organization/:organizationId/course/:courseId' component={Course}/>
          <CustomRoute exact path='/help-us' component={Form}/>

          <CustomRoute exact path='/admin' component={AdminPage} redirect={isNotAdmin} to='/access-denied'/>          

          <CustomRoute path='/test' component={Test}/>
          <CustomRoute path='/index.html' redirect/>
          <CustomRoute component={Error404Page} />
        </Switch>
      </Suspense>
    </Router>
  );
}