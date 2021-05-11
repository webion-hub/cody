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
  
  getDarknessMultiplier = (color) => {
    const colorObj = Color.set(color).colorObj

    const averageColor = (colorObj.r + colorObj.g + colorObj.b) / 3
    const maxVal = 1
    const minVal = 0.2
    const darknessMultiplier = (maxVal - (averageColor / 255)) * (maxVal - minVal) + minVal
    
    return darknessMultiplier
  }

  getShades(color){
    const colorController = Color.set(color)
    const shadeController = colorController.darkness

    const darknessMultiplier = this.getDarknessMultiplier(this.color.background)

    return {
      '100': shadeController(-80 * darknessMultiplier).color,
      '200': shadeController(-60 * darknessMultiplier).color,
      '300': shadeController(-40 * darknessMultiplier).color,
      '400': shadeController(-20 * darknessMultiplier).color,
      '500': color,
      '550': shadeController(10 * darknessMultiplier).color,
      '600': shadeController(20 * darknessMultiplier).color,
      '650': shadeController(30 * darknessMultiplier).color,
      '700': shadeController(40 * darknessMultiplier).color,
      '750': shadeController(50 * darknessMultiplier).color,
      '800': shadeController(60 * darknessMultiplier).color,
      '900': shadeController(80 * darknessMultiplier).color,
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
        contrastText: '#FFFFFFD9',
      },
      secondary: {
        ...secondaryShades,
        main: this.color.secondary,
        contrastText: '#FFFFFFD9',
      },
      tertiary: {
        main: this.color.tertiary,
      },
      background: {
        ...backgroundShades,
        paper: backgroundShades[800],
        default: backgroundShades[500],

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
              backgroundColor: Color.o(this.palette.background.contrastText, 0.8),
              color: this.palette.background[700]
            }
          },
          MuiToggleButton: {
            root: {
              color: this.color.textSecondary,
              borderColor: Color.o(this.color.secondary, 0.5),
              "&.Mui-selected:hover": {
                backgroundColor: `${Color.o(this.color.secondary, 0.9)} !important`
              },
              "&.Mui-selected": {
                backgroundColor: Color.o(this.color.secondary, 0.6),
              }
            },
          },
          MuiFilledInput: {
            root: {
              backgroundColor: Color.o(this.palette.background[400], 0.3),
              backdropFilter: 'blur(10px)',
              "&:hover": {
                backgroundColor: Color.o(this.palette.secondary[500], 0.2)
              },
              "&.Mui-focused": {
                backgroundColor: Color.o(this.palette.secondary[600], 0.2)
              }
            },
            underline: {
              "&:before": {
                borderColor: `${this.palette.secondary[800]} !important`
              }
            }
          },
          MuiListItem: {
            root: {
              "&.Mui-selected": {
                backgroundColor: Color.o(this.palette.secondary[600], 0.2)
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
                backgroundColor: Color.o(this.palette.secondary[500], 0.2)
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