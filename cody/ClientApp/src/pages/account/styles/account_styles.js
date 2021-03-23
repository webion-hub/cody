import { makeStyles } from '@material-ui/core/styles';

export const useAccountStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    position: "relative"
  },
	paperContainer: {
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