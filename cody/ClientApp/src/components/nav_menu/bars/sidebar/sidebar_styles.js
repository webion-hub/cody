import { makeStyles } from '@material-ui/core/styles';

export const fullDrawerWidth = 240;
export const restrictedWidth = 48;

export const sidebarStyles = makeStyles((theme) => ({
  fullDrawerPaper: {
    width: fullDrawerWidth,
    overflowX: "hidden",
    transition: "all 0.25s",
    backgroundColor: theme.palette.drawer.default,
  },
  restrictedDrawerPaper: {
    width: restrictedWidth,
    overflowX: "hidden",
    transition: "all 0.25s",
    backgroundColor: theme.palette.drawer.default,
  },
  fullPadding: {
    paddingLeft: fullDrawerWidth,
    transition: "all 0.25s",
  },
  restrictedPadding: {
    paddingLeft: restrictedWidth,
    transition: "all 0.25s",
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
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
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

  fullDrawerList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  },
  restrictedDrawerList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
  },
}));