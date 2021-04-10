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

import { Error } from 'src/components/illustrations/error';
import { Error404 } from 'src/components/illustrations/error404';
import { Sad } from 'src/components/illustrations/sad';
import { NetworkError } from 'src/components/illustrations/network_error';

import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import { AlertDialogItem } from './components/alert_dialog_item'
import { OfflineController } from './components/offline_controller';
import { Fab } from '@material-ui/core';
import EcoRoundedIcon from '@material-ui/icons/EcoRounded';

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

  const errorInfos = {
    serverError: { 
      icon: <CloudOffRoundedIcon/>, 
      label: "C'è stato un errore con il server!",
      illustration: NetworkError
    },
    sizeTooBig: { 
      icon: <ZoomOutMapRoundedIcon/>, 
      label: "Dimensione troppo grande!",
      illustration: Error
    },
    unauthorized: { 
      icon: <PanToolRoundedIcon/>, 
      label: "Richiesta non autorizzata!",
      illustration: Sad
    },
    badRequest: { 
      icon: <RemoveCircleOutlineRoundedIcon/>, 
      label: "Richiesta non valida!",
      illustration: Error
    },
    notFound: { 
      icon: <FindInPageRoundedIcon/>, 
      label: "Non trovato!",
      illustration: Error404
    },
    networkError: { 
      icon: <WifiOffRoundedIcon/>, 
      label: "C'è stato un errore di rete!",
      illustration: NetworkError
    },
    genericError: { 
      icon: <ErrorRoundedIcon/>, 
      label: "C'è stato un errore!",
      illustration: Error 
    },
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
          <CustomRoute exact path='/help-us' component={Form}/>
          
          <CustomRoute path='/admin' component={AdminPage}/>

          <CustomRoute path='/test' component={Test}/>
          <CustomRoute path='/index.html' redirect/>
          <CustomRoute component={Error404Page} />
        </Switch>
      </Suspense>      
      <AlertDialog
        open={errorsDialog !== ""}
        illustration={errorsDialog && errorInfos[errorsDialog].illustration}
        onClose={() => {
          setErrorsDialog("")
          PageController.refresh()
        }}
        buttonLabel="Ricarica la pagina"
      >
        <AlertDialogItem 
          icon  = {errorsDialog && errorInfos[errorsDialog].icon}
	    	  label = {errorsDialog && errorInfos[errorsDialog].label}
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
        href="/help-us"
        onClick={e => PageController.push("/help-us", e)}
      >
        <EcoRoundedIcon style={{marginRight: 8}}/>
        Aiutaci
      </Fab>
    </Router>
  );
}