import { itIT } from '@material-ui/core/locale';
import { Colors } from '../custom_colors'
import { createMuiTheme } from '@material-ui/core/styles';  

export const MainTheme = createMuiTheme({
    palette: {
      primary: {
        main: Colors.primary,
        contrastText: '#fff',
      },
      secondary: {
        main: Colors.secondary,
        contrastText: '#fff',
      },
      error: {
        main: Colors.errorRed,
      },
      background: {
        default: 'rgb(40, 40, 40)',
        paper: 'rgb(55, 55, 55)',
        contrastText: '#fff',
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#FFFFFF",  
        disabled: Colors.disable,    
      },
      action: {
        disabled: "rgba(255,255,255,0.3)",
        disabledBackground: Colors.disable, 
      },
    },
    typography: { 
       useNextVariants: true
    },
    overrides: {
      MuiFormLabel: {
        root: {
          color: Colors.lightGrey,
        },
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
      },
    },
  }, itIT);