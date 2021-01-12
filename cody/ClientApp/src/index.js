import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles';  
import CssBaseline from "@material-ui/core/CssBaseline";
import { MainTheme } from "./lib/default_values/themes/main_theme"
 
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');



ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <MuiThemeProvider theme = { MainTheme }>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();

