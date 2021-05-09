import { darkColors } from './colors/dark_colors'
import { lightColors } from './colors/light_colors'

import { itIT } from '@material-ui/core/locale';
import { createMuiTheme } from '@material-ui/core/styles';  
import { Color } from 'src/lib/color/color';

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

  getShades(color){
    const colorController = Color.setColor(color)

    return {
      shade1: colorController.lightness(20).color,
      shade2: colorController.lightness(40).color,
      shade3: colorController.lightness(60).color,
      shade4: colorController.lightness(80).color,
      shade5: colorController.darkness(20).color,
      shade6: colorController.darkness(40).color,
      shade7: colorController.darkness(60).color,
      shade8: colorController.darkness(80).color,
    }
  }

  getTheme(themeMode){
    this.setThemeMode(themeMode);
    return createMuiTheme({
      palette: {
        type: this.themeMode,
        primary: {
          ...this.getShades(this.color.primary),
          main: this.color.primary,
          contrastText: '#fff',
        },
        secondary: {
          ...this.getShades(this.color.secondary),
          main: this.color.secondary,
          contrastText: '#fff',
        },
        tertiary: {
          main: this.color.tertiary,
        },
        background: {
          ...this.getShades(this.color.background),
          paper: this.color.paper,
          paperSecondary: this.color.paperSecondary,

          default: this.color.background,
          defaultSecondary: this.color.backgroundSecondary,

          backgroundTransparent: this.color.backgroundTransparent,
          backgroundGradient: this.color.backgroundGradient,

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
        default: this.color.backgroundSecondary,
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
            ':root': {
              scrollbarWidth: 'thin !important',
            },
            '*::-webkit-scrollbar': {
              width: '4px',
              height: '4px',
            },
            '*::-webkit-scrollbar-thumb': {
              background: this.color.tertiary,
              borderRadius: '2px',
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
        MuiAvatar: {
          colorDefault: {
            backgroundColor: this.color.avatarBackground,
            color: this.color.backgroundSecondary
          }
        },
        MuiToggleButton: {
          root: {
            color: this.color.textSecondary,
            borderColor: Color.setColor(this.color.secondary).opacity(0.5).color,
            "&.Mui-selected:hover": {
              backgroundColor: `${Color.setColor(this.color.secondary).opacity(0.9).color} !important`
            },
            "&.Mui-selected": {
              backgroundColor: Color.setColor(this.color.secondary).opacity(0.6).color,
            }
          },
        },
        MuiTooltip: {
          tooltip: {
            color: this.color.backgroundSecondary,
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