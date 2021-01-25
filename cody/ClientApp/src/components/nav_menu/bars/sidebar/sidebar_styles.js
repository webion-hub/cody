import { makeStyles } from '@material-ui/core/styles';

export const fullDrawerWidth = 240;
export const restrictedWidth = 48;

export const sidebarStyles = makeStyles((theme) => ({
  fullDrawerPaper: {
    width: fullDrawerWidth,
    overflowX: "hidden",
    transition: "width 0.25s",
    backgroundColor: theme.palette.drawer.default,
    marginTop: 64,
    [theme.breakpoints.down('xs')]: {
      marginTop: 56,
    },
  },
  restrictedDrawerPaper: {
    width: restrictedWidth,
    overflowX: "hidden",
    transition: "width 0.25s",
    backgroundColor: theme.palette.drawer.default,
    marginTop: 64,
    [theme.breakpoints.down('xs')]: {
      marginTop: 56,
    },
  },

  children: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: restrictedWidth,
      transition: "all 0.25s",
    },
  },

  
  root: {
    display: 'flex',
  },
  drawer: {
    zIndex: 100000,
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
    },
  },

  listText: {
    whiteSpace: "nowrap",
  },

  listItem: {
    paddingLeft: 12,
    paddingRight: 12,
  },

  content: {
    flexGrow: 1,
  },
}));