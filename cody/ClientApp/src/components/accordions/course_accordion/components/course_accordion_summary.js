import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Typography from '@material-ui/core/Typography';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';

import { Grid } from "@material-ui/core";
import { PageController } from 'src/lib/page_controller';

const useStyles = makeStyles((theme) => ({
  teachersContainer: {
    width: "calc(100% - 90px)",
  },
  title: {
    width: "100%"
  },
  teachers: {
    width: "100%"
  },
  teachersLabel: {
    width: "100%"
  },
  accordionSummaryContent: {
    width: 0,
  },
  openButton: {
    position: "absolute",
    zIndex: 1,
    right: 16,
    top: 16,
  }
}));

export function CourseAccordionSummary(props){
	const classes = useStyles();

  const {
    id,
    title,
    teachers,
  } = props

  return (
    <>
    <AccordionSummary
      classes={{
        content: classes.accordionSummaryContent
      }}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          className={classes.teachersContainer}
        >
          <Typography
            noWrap
            className={classes.title}
            variant="h6"
            color="secondary"
          >
            {title}
          </Typography>
          <Typography
            className={classes.teachersLabel}
            variant="caption"
            align="left"
            color="textSecondary"
            noWrap
          >
            Professori
          </Typography>
          <Typography
            className={classes.teachers}
            align="left"
            color="textSecondary"
            noWrap
          >
            {teachers.map((teacher, index) => 
              `${index !== 0 ? ", " : ""}${teacher.username}`
            )}
          </Typography>
        </Grid>
      </Grid>
    </AccordionSummary>
    <Button
      className={classes.openButton}
      variant="outlined"
      color="secondary"
      href={`${window.location.pathname}/course/${id}`}
      onClick={e => {
        e.stopPropagation()
        PageController.push(`${window.location.pathname}/course/${id}`, e)
      }}
      onFocus={e => e.stopPropagation()}
      endIcon={<OpenInNewRoundedIcon/>}
    >
      Apri
    </Button>
    </>
  )
}