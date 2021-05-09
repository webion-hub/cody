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

    this.palette = this.createPalette()
  }

  getShades(color){
    const colorController = Color.setColor(color)
    const shadeController = colorController.darkness

    if(this.themeMode === 'light')
      return {
        '100': shadeController(-8).color,
        '200': shadeController(-6).color,
        '300': shadeController(-4).color,
        '400': shadeController(-2).color,
        '500': color,
        '550': shadeController(2).color,
        '600': shadeController(4).color,
        '650': shadeController(6).color,
        '700': shadeController(8).color,
        '750': shadeController(10).color,
        '800': shadeController(12).color,
        '900': shadeController(14).color,
      }
      
    return {
      '100': shadeController(-80).color,
      '200': shadeController(-60).color,
      '300': shadeController(-40).color,
      '400': shadeController(-20).color,
      '500': color,
      '550': shadeController(10).color,
      '600': shadeController(20).color,
      '650': shadeController(30).color,
      '700': shadeController(40).color,
      '750': shadeController(50).color,
      '800': shadeController(60).color,
      '900': shadeController(80).color,
    }
  }

  createPalette(){
    const primaryShades = this.getShades(this.color.primary)
    const secondaryShades = this.getShades(this.color.secondary)
    const backgroundShades = this.getShades(this.color.background)

    return {
      primary: {
        ...primaryShades,
        main: this.color.primary,
        contrastText: '#fff',
      },
      secondary: {
        ...secondaryShades,
        main: this.color.secondary,
        contrastText: '#fff',
      },
      tertiary: {
        main: this.color.tertiary,
      },
      background: {
        ...backgroundShades,
        paper: backgroundShades[800],
        default: backgroundShades[500],

        backgroundGradient: `linear-gradient(180deg, ${secondaryShades[900]} -80%, ${backgroundShades[500]} 100%)`,
        contrastText: this.color.contrastText,
      },
      text: {
        primary: this.color.textPrimary,
        secondary: this.color.textSecondary
      }
    }
  }

  getTheme(themeMode){
    this.setThemeMode(themeMode);

    return createMuiTheme({
        palette: {
          type: this.themeMode,
          ...this.palette
        },
        appBar: {
          fullHeight: 64,
          mobileHeight: 56,
          color: this.palette.secondary[800],
        },
        drawer: {
          default: this.palette.background[700],
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
                background: this.palette.secondary[700],
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
          MuiDrawer: {
            paperAnchorDockedLeft: {
              borderRight: "none",
            }
          },
          MuiAppBar: {
            colorPrimary: {
              backgroundColor: this.palette.secondary[800]
            }
          },
          MuiAvatar: {
            colorDefault: {
              backgroundColor: this.palette.background.contrastText.opacity(0.8).color,
              color: this.palette.background[700]
            }
          },
          MuiToggleButton: {
            root: {
              color: this.color.textSecondary,
              borderColor: this.color.secondary.opacity(0.5).color,
              "&.Mui-selected:hover": {
                backgroundColor: `${this.color.secondary.opacity(0.9).color} !important`
              },
              "&.Mui-selected": {
                backgroundColor: this.color.secondary.opacity(0.6).color,
              }
            },
          },
          MuiFilledInput: {
            root: {
              backgroundColor: this.palette.background[400].opacity(0.3).color,
              backdropFilter: 'blur(10px)',
              "&:hover": {
                backgroundColor: this.palette.secondary[500].opacity(0.2).color
              },
              "&.Mui-focused": {
                backgroundColor: this.palette.secondary[600].opacity(0.2).color
              }
            },
            underline: {
              "&:before": {
                borderColor: `${this.palette.secondary[800]} !important`
              }
            }
          },
          MuiTouchRipple: {
            child: {
              backgroundColor: this.palette.secondary[600]
            }
          },
          MuiButtonBase: {
            root: {
              "&:hover": {
                backgroundColor: this.palette.secondary[500].opacity(0.2).color
              }
            }
          },
          MuiTooltip: {
            tooltip: {
              color: this.palette.background[700],
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