import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import { Grid, Button, AccordionActions, AccordionDetails } from "@material-ui/core";

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
    <>
      <AccordionDetails>
        <Grid
          container
          direction="column"
        >
          <Typography>
            {description.length === 0 ? "Nessuna descrizione." : description}
          </Typography>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Button
          className={classes.lessonButton}
          color="secondary"
        >
          Vai alla ultima lezione
        </Button>
      </AccordionActions>
    </>
  )
}