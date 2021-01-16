import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../../lib/default_values/custom_colors';

export const fullDrawerWidth = 240;
export const restrictedWidth = 48;

export const sidebarStyles = makeStyles((theme) => ({
  fullDrawerPaper: {
    width: fullDrawerWidth,
    overflowX: "hidden",
    transition: "all 0.25s",
    backgroundColor: Colors.backgroundDark
  },
  restrictedDrawerPaper: {
    width: restrictedWidth,
    overflowX: "hidden",
    transition: "all 0.25s",
    backgroundColor: Colors.backgroundDark
  },
  fullPadding: {
    paddingLeft: fullDrawerWidth,
    transition: "all 0.25s",
  },
  restrictedPadding: {
    paddingLeft: restrictedWidth,
    transition: "all 0.25s",
  },
  
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
    },
  },

  appBar: {
    [theme.breakpoints.up('sm')]: {
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  listText: {
    whiteSpace: "nowrap",
  },

  listItem: {
    paddingLeft: 12,
    paddingRight: 12,
  },


  fullToolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  },
  restrictedToolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
  },
}));