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
import { LoginDialog } from './components/dialogs/login_dialog';
import { useListener } from './lib/hooks/use_listener';
import { EventsDispatcher } from './lib/events_dispatcher';

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
  const [currentError, setCurrentError] = React.useState("")
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);

  const { userState } = React.useContext(UserContext);
  const isLogged = userState === "logged"
  const isNotLogged = userState === "notLogged"

  Requests.onRedirect = (where) => {
    window.location.href = where;
  };

  Requests.onError = (reason) => {
    setCurrentError(reason);
  };

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true)
  }

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false)
  }

	useListener({
		eventFunction: handleOpenLoginDialog,
		controller: EventsDispatcher.setEvent('openLoginDialog'),
    removeFirstExecution: true,
  }, [])

  const errorInfos = {
    serverError: { 
      icon: <CloudOffRoundedIcon/>, 
      title: "Sembra che il server abbia riscontrato un problema",
      illustration: NetworkError,
      description: `
        Cercheremo di risolvere il problema il prima possibile, 
        intanto puoi provare a ricaricare la pagina
      `,
    },
    sizeTooBig: { 
      icon: <ZoomOutMapRoundedIcon/>, 
      title: "Le dimensioni del file sono troppo grandi",
      illustration: Error,
      description: `
        Prova a caricare un file di dimensioni più piccole
      `,
    },
    unauthorized: { 
      icon: <PanToolRoundedIcon/>, 
      title: "Non sei autorizzato ad accedere a questo contenuto",
      illustration: Sad,
      description: `
        Prova a loggarti con un account con privilegi più elevati
      `,
    },
    badRequest: { 
      icon: <RemoveCircleOutlineRoundedIcon/>, 
      title: "Richiesta non valida",
      illustration: Error,
      description: ``,
    },
    notFound: { 
      icon: <FindInPageRoundedIcon/>, 
      title: "Non trovato",
      illustration: Error404,
      description: `
        La risorsa che hai richiesto non è stata trovata
      `,
    },
    networkError: { 
      icon: <WifiOffRoundedIcon/>, 
      title: "Si è verificato un errore di rete",
      illustration: NetworkError,
      description: `
        Probabilmente sei offline, prova a ricaricare la pagina
      `,
    },
    genericError: { 
      icon: <ErrorRoundedIcon/>, 
      title: "Si è verificato un errore",
      illustration: Error,
      description: `
        Scusa, questo non sarebbe dovuto succedere ＞﹏＜
      `,
    },
  };

  const errorInfo = errorInfos[currentError];
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
        open={errorInfo !== undefined}
        illustration={errorInfo?.illustration}
        onClose={() => {
          setCurrentError("");
          PageController.refresh();
        }}
        title={errorInfo?.title}
        buttonLabel="Ricarica la pagina"
      >
        <AlertDialogItem
          icon = {errorInfo?.icon}
          label = {errorInfo?.description}
        />
      </AlertDialog>
      <LoginDialog
        open={openLoginDialog}
        onClose={handleCloseLoginDialog}
        onSuccess={handleCloseLoginDialog}      
      />
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