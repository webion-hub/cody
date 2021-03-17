import { makeStyles } from '@material-ui/core/styles';

export const fullDrawerWidth = 240;

export const sidebarStyles = makeStyles((theme) => ({
  scrollableDrawer: {
    zIndex: "900 !important"
  },
  fullDrawerPaper: {
    width: fullDrawerWidth,
    overflowX: "hidden",
    transition: "width 0.25s",
    backgroundColor: theme.drawer.default,
    marginTop: 64,
    [theme.breakpoints.down('xs')]: {
      marginTop: 56,
    },
  },
  restrictedDrawerPaper: {
    width: theme.drawer.width,
    overflowX: "hidden",
    transition: "width 0.25s",
    backgroundColor: theme.drawer.default,
    marginTop: 64,
    [theme.breakpoints.down('xs')]: {
      marginTop: 56,
    },
  },

  children: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.drawer.width,
      width: "100%",
      transition: "all 0.25s",
    },
  },
  
  root: {
    display: 'flex',
  },
  drawer: {
    zIndex: 1300,
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
    },
  },

  listText: {
    whiteSpace: "nowrap",
  },

  listItem: {
    paddingLeft: "12px",
    paddingRight: "12px",
  },

  content: {
    flexGrow: 1,
  },
}));