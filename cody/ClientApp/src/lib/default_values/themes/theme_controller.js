import { darkColors } from './colors/dark_colors'
import { lightColors } from './colors/light_colors'

import { itIT } from '@material-ui/core/locale';
import { createMuiTheme } from '@material-ui/core/styles';  

export class ThemeController {
  constructor(){
    this.color = darkColors;
    this.themeMode = "dark";
  }

  setThemeMode(themeMode){
    this.themeMode = themeMode;
    switch(themeMode){
      case "dark":
        this.color = darkColors;
        break;
      case "light":
        this.color = lightColors;
        break;
      default:
        this.color = lightColors;
    }
  }

  getTheme(themeMode){
    this.setThemeMode(themeMode);
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
        tertiary: {
          main: this.color.tertiary,
        },
        background: {
          default: this.color.background,
          paper: this.color.backgroundLight,
          paperDark: this.color.backgroundDarkest,
          backgroundTransparent: this.color.backgroundTransparent,
          backgroundGradient: this.color.backgroundGradient,
          dark: this.color.backgroundDark,
          contrastText: '#fff',
        },
        text: {
          primary: this.color.textPrimary,
          secondary: this.color.textSecondary
        }
      },
      appBar: {
        fullHeight: 64,
        mobileHeight: 56,
        color: this.color.appBar,
      },
      drawer: {
        default: this.color.backgroundDark,
        width: 48,
      },
      typography: {
        fontFamily: [
          'Rubik',
          'sans-serif'
        ] 
      },
      overrides: {
        MuiCssBaseline: {
          '@global': {
            '*': {
              'scrollbar-width': 'thin',
            },
            '*::-webkit-scrollbar': {
              width: '4px',
              height: '4px',
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
        },
        MuiTooltip: {
          tooltip: {
            color: this.color.backgroundDark,
            backgroundColor: this.color.tertiary
          },
          arrow: {
            color: this.color.tertiary
          },
        },
      },
    }, itIT)
  }
}