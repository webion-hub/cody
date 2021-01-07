import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import CssBaseline from "@material-ui/core/CssBaseline";
import { itIT } from '@material-ui/core/locale';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');


export const Colors = {
  primary: 'rgb(51, 102, 255)',
  secondary: 'rgb(102, 153, 255)',
  background: 'rgb(40, 40, 40)', 
  lightGrey: 'rgba(255,255,255,0.6)',
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary,
      contrastText: '#fff',
    },
    secondary: {
      main: Colors.secondary,
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
    action: {
      disabled: "rgba(255,255,255,0.3)",
      disabledBackground: "rgba(140,140,140,0.25)"
    }
  },
  typography: { 
     useNextVariants: true
  },

  overrides: {
    MuiFormLabel: {
      root: {
        color: Colors.lightGrey,
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "rgba(255,255,255,0.3)",
      }
    },
    MuiIconButton: {
      root: {
        color: "rgba(255,255,255,0.5)"
      },      
    },   
    MuiStepIcon: {
      completed: {
        color: `${Colors.secondary} !important` 
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "rgba(255,255,255,0.1)"
      }
    },
    MuiPickersCalendarHeader: {
      dayLabel: {
        color: "white"
      }
    },
    MuiTypography: {
      colorPrimary: {
        color: Colors.secondary
      }
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: "rgba(255, 255, 255, 0.8)"
      }
    }
  }
}, itIT);

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

