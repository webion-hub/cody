import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { CourseAccordionSummary } from "./components/course_accordion_summary";
import { CourseAccordionDetails } from "./components/course_accordion_details";
import { PageController } from 'src/lib/page_controller';
import { Grow } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  accordion: {
    background: theme.palette.background[700]
  },
  hideLine: {
    "&.MuiAccordion-root:before": {
      backgroundColor: "transparent"
    }
  },
  showLine: {
    "&.MuiAccordion-root:before": {
      backgroundColor: theme.palette.background[500]
    }
  },
}));

export function CourseAccordion(props){
	const classes = useStyles();

  const {
    data,
    index,
  } = props

  const {
    id,
    title,
    description,
    teachers
  } = data

  const isFirst = index === 0

  return (
    <Grow
      in
      timeout={400*(index + 1)}
    >
      <Accordion
        elevation={0}
        className={classes.accordion}
        classes={{
          root: isFirst 
            ? classes.hideLine 
            : classes.showLine
        }}
      >
        <CourseAccordionSummary
          id={id}
          title={title}
          teachers={teachers}
        />
        <CourseAccordionDetails
          description={description}
        />
      </Accordion>
    </Grow>
  )
}