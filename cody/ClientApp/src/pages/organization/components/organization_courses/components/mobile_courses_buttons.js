import { makeStyles } from '@material-ui/core/styles';

import { Grid, Button } from "@material-ui/core";
import { useMobileView } from "src/lib/hooks/use_mobile_view";

const useStyles = makeStyles((theme) => ({
  mobileButton: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export function MobileCoursesButtons(props){
	const classes = useStyles();
  const mobileView = useMobileView()

  const {
    onAddCourse,
    onShowSearch,
    showSearchBar,
    callerIs
  } = props
  const canCallerAddCourse = callerIs !== "noMember"

  if(mobileView)
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        {
          canCallerAddCourse && mobileView &&
            <Button
              className={classes.mobileButton}
              variant="contained"
              color="primary"
              onClick={onAddCourse}
            >
              Aggiungi Corso
            </Button>
        }
        <Button
          className={classes.mobileButton}
          variant="outlined"
          color="secondary"
          onClick={onShowSearch}
        >
          {showSearchBar ? "Chiudi" : "Cerca"}
        </Button>
      </Grid>
    )

  return <></>;
}