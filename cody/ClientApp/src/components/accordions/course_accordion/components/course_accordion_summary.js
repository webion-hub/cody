import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary';

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import Typography from '@material-ui/core/Typography';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';

import { Grid, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  openCourseIcon: {
    marginLeft: -theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  autoWidth: {
    width: "auto"
  },
}));

export function CourseAccordionSummary(props){
	const classes = useStyles();
  const theme = useTheme();
  const smallScreenView = useMediaQuery(theme.breakpoints.down('md'));

  const {
    title,
    teachers,
  } = props

  return (
    <AccordionSummary
      expandIcon={<ExpandMoreRoundedIcon />}
    >
      <Grid
        container
        direction={smallScreenView ? "column" : "row"}
        justify="space-between"
        alignItems={smallScreenView ? "flex-start" : "center"}
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
          <Typography
            noWrap
          >
            {title}
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          className={classes.autoWidth}
        >
          <Typography
            variant="caption"
            align={smallScreenView ? "left" : "right"}
            color="textSecondary"
            noWrap
          >
            Professori
          </Typography>
          <Typography
            color="textSecondary"
            noWrap
          >
            {teachers.map((teacher, index) => 
              `${index !== 0 ? ", " : ""}${teacher}`
            )}
          </Typography>
        </Grid>
      </Grid>
    </AccordionSummary>
  )
}