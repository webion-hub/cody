import React, { Component, lazy, Suspense } from 'react';
import { Router, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';

import { UserControllerContext } from "./components/user_controller_context/user_controller_context";
import { UserContext } from "./components/user_controller_context/user_controller_context";
import { CustomRoute } from "./components/route_components/custom_route";
import history from 'src/history';

import Requests from 'src/lib/server_calls/requests';

import './custom.css';
import { AlertDialog } from './components/dialogs/alert_dialog';
import { PageController } from './lib/page_controller';

import PanToolIcon from '@material-ui/icons/PanTool';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import ErrorIcon from '@material-ui/icons/Error';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { AlertDialogItem } from './components/alert_dialog_item'

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

  Requests.onRedirect = (where) => {
    window.location.href = where;
  };

  Requests.onError = (reason) => {
    setErrorsDialog(reason)
  };

  const errorLabels = {
    serverError: [ <CloudOffIcon/>, "C'è stato un errore con il server!" ],
    sizeTooBig: [ <ZoomOutMapIcon/>, "Dimensione troppo grande!" ],
    unauthorized: [ <PanToolIcon/>, "Richiesta non autorizzata!" ],
    badRequest: [ <RemoveCircleOutlineIcon/>, "Richiesta non valida!" ],
    notFound: [ <FindInPageIcon/>, "Non trovato!" ],
    networkError: [ <WifiOffIcon/>, "C'è stato un errore di rete!" ],
    genericError: [ <ErrorIcon/>, "C'è stato un errore!" ],
  }

  return (
    <Router history={history}>
      <Suspense fallback={
        <div id="ringContainer" className="center-children">
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
          icon  = {errorsDialog ? errorLabels[errorsDialog][0]: ""}
	    	  label = {errorsDialog ? errorLabels[errorsDialog][1]: ""}
        />
      </AlertDialog>
    </Router>
  );
}