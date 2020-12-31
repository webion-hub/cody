import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import CssBaseline from "@material-ui/core/CssBaseline";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(51, 102, 255)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(102, 153, 255)',
      contrastText: '#fff',
    },
    background: {
      default: 'rgb(40, 40, 40)',
      paper: 'rgb(55, 55, 55)',
      contrastText: '#fff',
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",      
    },
  },
  typography: { 
     useNextVariants: true
  }
});

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <MuiThemeProvider theme = { theme }>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();

