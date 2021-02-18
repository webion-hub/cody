import { makeStyles } from '@material-ui/core/styles';

export const accountStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    position: "relative"
  },
	box: {
    padding: theme.spacing(2),
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
    },
	},
}));