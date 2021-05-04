import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  lessonButton: {
    marginLeft: theme.spacing(2)
  },
  buttonContainer: {
    marginTop: theme.spacing(2)
  },
}));

export function CourseAccordionDetails(props){
	const classes = useStyles();

  const {
    description,
  } = props
  
  return (
    <Grid
      container
      direction="column"
    >
      <Typography>
        {description}
      </Typography>
      <Grid
        className={classes.buttonContainer}
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Button
          color="secondary"
          variant="outlined"
        >
          Esercitazioni
        </Button>
        <Button
          className={classes.lessonButton}
          color="secondary"
          variant="outlined"
        >
          Lezioni
        </Button>
      </Grid>
    </Grid>
  )
}