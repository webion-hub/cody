import loadable from '@loadable/component'
import { Layout } from 'src/components/Layout';

import { UserControllerContext } from "src/components/user_controller_context/user_controller_context";
import { OfflineController } from 'src/components/offline_controller';

import { MainFab } from './components/main_fab';
import { Routes } from './routes';
import 'src/custom.css';

const MainLoginDialog = loadable(() => import('./components/main_login_dialog'))
const MainAlertDialog = loadable(() => import('./components/main_alert_dialog'))
const CookieConsentSnackBar = loadable(() => import('src/components/cookie_consent_snackbar'))

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
        <MainAlertDialog/>
        <MainLoginDialog/>
        <MainFab/>
      </Layout>
    </UserControllerContext>
  );
}