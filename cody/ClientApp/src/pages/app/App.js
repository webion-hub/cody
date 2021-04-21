import React from 'react';
import { Layout } from 'src/components/Layout';

import { UserControllerContext } from "src/components/user_controller_context/user_controller_context";
import CookieConsentSnackBar from "src/components/cookie_consent_snackbar";

import { OfflineController } from 'src/components/offline_controller';
import { MainAlertDialog } from 'src/pages/app/components/main_alert_dialog';

import { MainLoginDialog } from './components/main_login_dialog';
import { MainFab } from './components/main_fab';
import { Routes } from './routes';

import 'src/custom.css';

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