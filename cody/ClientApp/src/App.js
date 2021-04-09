import React, { lazy, Suspense } from 'react';
import { Router, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';

import { UserControllerContext } from "./components/user_controller_context/user_controller_context";
import { UserContext } from "./components/user_controller_context/user_controller_context";
import { CustomRoute } from "./components/route_components/custom_route";
import CookieConsentSnackBar from "./components/cookie_consent_snackbar"
import history from 'src/history';

import Requests from 'src/lib/server_calls/requests';

import './custom.css';
import { AlertDialog } from './components/dialogs/alert_dialog';
import { PageController } from './lib/page_controller';

import PanToolRoundedIcon from '@material-ui/icons/PanToolRounded';
import WifiOffRoundedIcon from '@material-ui/icons/WifiOffRounded';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import CloudOffRoundedIcon from '@material-ui/icons/CloudOffRounded';
import ZoomOutMapRoundedIcon from '@material-ui/icons/ZoomOutMapRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';

import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import { AlertDialogItem } from './components/alert_dialog_item'
import { OfflineController } from './components/offline_controller';
import { Fab } from '@material-ui/core';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';

const Login = lazy(() => import('./pages/login/login'));
const SignUp = lazy(() => import('./pages/sign_up/SignUp'));
const Error404Page = lazy(() => import('./pages/message_pages/Error404Page'));
const EmailValidPage = lazy(() => import('./pages/message_pages/email_valid_page/EmailValidPage'));
const UnauthorizedPage = lazy(() => import('./pages/message_pages/UnauthorizedPage'));
const Home = lazy(() => import('./pages/home/home'));
const Account = lazy(() => import('./pages/account/account'));
const Test = lazy(() => import('./pages/test'));
const AdminPage = lazy(() => import('./pages/admin_pages/AdminPage'));
const CreateOrJoinOrganization = lazy(() => import('./pages/create_or_join_organization/CreateOrJoinOrganizationPage'));
const OrganizationPage = lazy(() => import('./pages/organization/OrganizationPage'));
const Form = lazy(() => import('./pages/Form'));


export default function App(){
  return (
    <UserControllerContext>
      <Layout>
        <CookieConsentSnackBar
          cookieName="Cody-AcceptCookies"
          message="Questo sito usa i cookie per offrirti un'esperienza ottimale. "
          link="Privacy&Policy page"
        />
        <OfflineController>
          <Routes/>
        </OfflineController>
      </Layout>
    </UserControllerContext>
  );
}

function Routes(){
  const [errorsDialog, setErrorsDialog] = React.useState("")
  const { userState } = React.useContext(UserContext);
  const isLogged = userState === "logged"
  const isNotLogged = userState === "notLogged"

  Requests.onRedirect = (where) => {
    window.location.href = where;
  };

  Requests.onError = (reason) => {
    setErrorsDialog(reason)
  };

  const errorLabels = {
    serverError: [ <CloudOffRoundedIcon/>, "C'è stato un errore con il server!" ],
    sizeTooBig: [ <ZoomOutMapRoundedIcon/>, "Dimensione troppo grande!" ],
    unauthorized: [ <PanToolRoundedIcon/>, "Richiesta non autorizzata!" ],
    badRequest: [ <RemoveCircleOutlineRoundedIcon/>, "Richiesta non valida!" ],
    notFound: [ <FindInPageRoundedIcon/>, "Non trovato!" ],
    networkError: [ <WifiOffRoundedIcon/>, "C'è stato un errore di rete!" ],
    genericError: [ <ErrorRoundedIcon/>, "C'è stato un errore!" ],
  }

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
          <CustomRoute exact path='/form' component={Form}/>
          
          <CustomRoute path='/admin' component={AdminPage}/>

          <CustomRoute path='/test' component={Test}/>
          <CustomRoute path='/index.html' redirect/>
          <CustomRoute component={Error404Page} />
        </Switch>
      </Suspense>      
      <AlertDialog
        open={errorsDialog !== ""}
        onClose={() => {
          setErrorsDialog("")
          PageController.refresh()
        }}
        buttonLabel="Ricarica la pagina"
      >
        <AlertDialogItem 
          icon  = {errorsDialog && errorLabels[errorsDialog][0]}
	    	  label = {errorsDialog && errorLabels[errorsDialog][1]}
        />
      </AlertDialog>
      <Fab 
        variant="extended"
        color="primary"
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
        }}
        href="/form"
        onClick={e => PageController.push("/form", e)}
      >
        <AssignmentRoundedIcon style={{marginRight: 8}}/>
        Sondaggio
      </Fab>
    </Router>
  );
}