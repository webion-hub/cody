import { darkColors } from './colors/dark_colors'
import { lightColors } from './colors/light_colors'

import { itIT } from '@material-ui/core/locale';
import { createMuiTheme } from '@material-ui/core/styles';  

export class ThemeController {
  constructor(){
    this.color = lightColors;
    this.themeMode = "light";
  }

  setThemeMode(themeMode){
    this.themeMode = themeMode;
    switch(themeMode){
      case "dark":
        this.color = darkColors;
        break;
      case "light":
        this.color = lightColors;
    }
  }

  getTheme(){
    return createMuiTheme({
      palette: {
        type: this.themeMode,
        primary: {
          main: this.color.primary,
          contrastText: '#fff',
        },
        secondary: {
          main: this.color.secondary,
          contrastText: '#fff',
        },
        background: {
          default: this.color.background,
          paper: this.color.backgroundLight,
          contrastText: '#fff',
        },
        drawer: {
          default: this.color.backgroundDark,
        },
      },
      overrides: {
        MuiCssBaseline: {
          '@global': {
            '*': {
              'scrollbar-width': 'thin',
            },
            '*::-webkit-scrollbar': {
              width: '4px',
            },
            '*::-webkit-scrollbar-thumb': {
              background: this.color.tertiary
            },
          }
        },
        MuiStepIcon: {
          root: {
            color: this.color.tertiary,
          },
          completed: {
            color: `${this.color.secondary} !important` 
          }
        },
        MuiAppBar: {
          colorPrimary: {
            backgroundColor: this.color.appBar
          }
        },
        MuiDrawer: {
          paperAnchorDockedLeft: {
            borderRight: "none",
          }
        }
      },
    }, itIT)
  }
}