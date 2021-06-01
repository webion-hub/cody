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
  const [expand, setExpand] = React.useState(false)

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
        expanded={expand}
        elevation={0}
        className={classes.accordion}
        onClick={e => {
          e.stopPropagation()
          PageController.push(`${window.location.pathname}/course/${id}`, e)
        }}
        classes={{
          root: isFirst 
            ? classes.hideLine 
            : classes.showLine
        }}
      >
        <CourseAccordionSummary
          title={title}
          teachers={teachers}
          expanded={expand}
          onExpand={_ => setExpand(!expand)}
        />
        <AccordionDetails>
          <CourseAccordionDetails
            description={description}
          />
        </AccordionDetails>
      </Accordion>
    </Grow>
  )
}