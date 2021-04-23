import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { CourseAccordionSummary } from "./components/course_accordion_summary";
import { CourseAccordionDetails } from "./components/course_accordion_details";

const useStyles = makeStyles((theme) => ({
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
      <CourseAccordionSummary
        title={title}
        teachers={teachers}
      />
      <AccordionDetails>
        <CourseAccordionDetails
          description={description}
        />
      </AccordionDetails>
    </Accordion>
  )
}