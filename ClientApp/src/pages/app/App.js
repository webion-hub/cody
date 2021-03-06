import { lazyLoader } from 'src/components/utilities/lazy_loader';
import { Layout } from 'src/components/bases/layouts/Layout';

import { UserControllerContext } from "src/components/global_contexts/user_controller_context/user_controller_context";
import { OfflineController } from 'src/components/bases/layouts/offline_controller';

import { MainFab } from './components/main_fab';
import { Routes } from './routes';
import CookieConsentSnackBar from 'src/components/snackbars/cookie_consent_snackbar'
import MainLoginDialog from './components/main_login_dialog'
import 'src/custom.css';

const MainAlertDialog = lazyLoader(() => import('./components/main_alert_dialog'))

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