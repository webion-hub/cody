import { makeStyles } from '@material-ui/core/styles';

export const useAccountStyles = makeStyles((theme) => ({
	paperContainer: {
    padding: theme.spacing(2),
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