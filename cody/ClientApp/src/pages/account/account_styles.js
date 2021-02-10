import { makeStyles } from '@material-ui/core/styles';

export const accountStyles = makeStyles((theme) => ({
	box: {
		maxWidth: 450,
		width: "100%",
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
    },
	},
	mainPaper: {
		padding: theme.spacing(2),
	},
  title: {
    [theme.breakpoints.down('xs')]: {
      textAlign: "center",
    },
  }
}));