import { makeStyles } from '@material-ui/core/styles';

export const accountStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    position: "relative"
  },
	box: {
    background: theme.palette.background.paperSecondary,
    padding: theme.spacing(2),
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
    },
	},
  submitButton: {
    paddingTop: theme.spacing(1),
    [theme.breakpoints.between('sm', 830)]: {
      width: "100%",
      maxWidth: 370,
      margin: "0 auto"
    },
  }
}));