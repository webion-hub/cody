import React, { Component, lazy, Suspense } from 'react';
import { Router, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';

import { UserControllerContext } from "./components/user_controller_context/user_controller_context";
import { UserContext } from "./components/user_controller_context/user_controller_context";
import { CustomRoute } from "./components/route_components/custom_route";
import history from 'src/history';
import { User } from 'src/lib/user';
 
import Requests from 'src/lib/requests';

import './custom.css';
import { AlertDialog } from './components/dialogs/alert_dialog';
import { PageController } from './lib/page_controller';
import { ThemeContext } from 'src/components/theme_context';

const Login = lazy(() => import('./pages/login/login'));
const SignUp = lazy(() => import('./pages/sign_up/SignUp'));
const Error404Page = lazy(() => import('./pages/message_pages/Error404Page'));
const EmailValidPage = lazy(() => import('./pages/message_pages/email_valid_page/EmailValidPage'));
const UnauthorizedPage = lazy(() => import('./pages/message_pages/UnauthorizedPage'));
const Home = lazy(() => import('./pages/home/Home'));
const Account = lazy(() => import('./pages/account/account'));
const Test = lazy(() => import('./pages/test'));
const AdminPage = lazy(() => import('./pages/admin_pages/AdminPage'));
const CreateOrJoinOrganization = lazy(() => import('./pages/create_or_join_organization/CreateOrJoinOrganizationPage'));
const OrganizationPage = lazy(() => import('./pages/organization/OrganizationPage'));


export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);

    let currentTheme = 'light';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme = "dark"
    };
    if(localStorage.getItem("Cody-ThemeMode"))
      currentTheme = localStorage.getItem("Cody-ThemeMode");

      User.isLogged().then(isLogged => {
        if (!isLogged)
          return;
    
        User.getThemeColor().then(themeColor => {
          if(themeColor)
          {
            currentTheme = themeColor;
            this.setState( _ => ({
              theme: currentTheme.toLowerCase()
            }));  
          }
      });
    });
    

    this.toggleTheme = () => {
      currentTheme = 
        currentTheme == 'dark'? 
          'light' : 
          'dark'

      this.setState( _ => ({
        theme: currentTheme
      }));  

      User.isLogged().then(isLogged => {
          User.setThemeColor(currentTheme);
      });

      localStorage.setItem('Cody-ThemeMode', currentTheme);  
    };


    this.state = {
      theme: currentTheme,
      toggleTheme: this.toggleTheme,
    };
  }

  render () {
    return (
      <UserControllerContext>
        <ThemeContext.Provider value={this.state}>
          <Layout>
            <Routes/>
          </Layout>
        </ThemeContext.Provider>
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
    serverError: "C'è stato un errore con il server!",
    sizeTooBig: "Dimensione troppo grande!",
    unauthorized: "Richiesta non autorizzata!",
    badRequest: "Richiesta non valida!",
    notFound: "Non trovato!",
    networkError: "C'è stato un errore di rete!",
    genericError: "C'è stato un errore!",
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
        {errorLabels[errorsDialog]}
      </AlertDialog>
    </Router>
  );
}