import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';

import { Grid, IconButton, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  lessonButton: {
    marginLeft: theme.spacing(2)
  },
  accordion: {
    background: theme.palette.background.paperSecondary
  },
  hideLine: {
    "&.MuiAccordion-root:before": {
      backgroundColor: "transparent"
    }
  },
  showLine: {
    "&.MuiAccordion-root:before": {
      backgroundColor: theme.palette.background.default
    }
  },
  openCourseIcon: {
    marginLeft: -theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  buttonContainer: {
    marginTop: theme.spacing(2)
  },
  autoWidth: {
    width: "auto"
  }
}));

export function CourseAccordion(props){
	const classes = useStyles();

  const {
    title,
    description,
    teachers,
  } = props

  return (
    <Accordion
      square
      className={classes.accordion}
      classes={{
        root: props.firstAccordion ? classes.hideLine : classes.showLine
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid
            className={classes.autoWidth}
            container
            direction="row"
            alignItems="center"
          >
            <IconButton
              className={classes.openCourseIcon}
              color="secondary"
              onClick={e => e.stopPropagation()}
              onFocus={e => e.stopPropagation()}
            >
              <OpenInNewRoundedIcon/>
            </IconButton>
            <Typography>{title}</Typography>
          </Grid>
          <Grid
            container
            direction="column"
            className={classes.autoWidth}
          >
            <Typography
              variant="caption"
              align="right"
              color="textSecondary"
            >
              Professori
            </Typography>
            <Typography
              color="textSecondary"
            >
              {teachers.map((teacher, index) => 
                `${index !== 0 ? ", " : ""}${teacher}`
              )}
            </Typography>
          </Grid>

        </Grid>
      </AccordionSummary>
      <AccordionDetails>
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
              color="primary"
              variant="contained"
            >
              Lezioni
            </Button>
          </Grid>
        </Grid>

      </AccordionDetails>
    </Accordion>
  )
}