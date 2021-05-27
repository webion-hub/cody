import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Typography from '@material-ui/core/Typography';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import { Grid } from "@material-ui/core";
import TooltipLink from 'src/components/typography/tooltip_link';
import { Color } from 'src/lib/color/color';

const useStyles = makeStyles((theme) => ({
  sumamry: {
    background: Color.o(theme.palette.background[800], 0.3)
  },
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
  expandButton: {
    position: "absolute",
    right: 0,
    transform: "translate(0, -50%)",
    top: "50%"
  },
  expandIcon: {
    transition: "0.25s all"
  },
  expanded: {
    transform: "rotate(180deg)"
  }
}));

export function CourseAccordionSummary(props){
	const classes = useStyles();

  const {
    title,
    teachers,
    expanded,
    onExpand
  } = props

  return (
    <AccordionSummary
      className={classes.sumamry}
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
              <>
                {index !== 0 ? ", " : ""}
                <TooltipLink
                  user={teacher}
                />
              </>
            )}
          </Typography>
        </Grid>
      </Grid>
      <IconButton
        onClick={e => {
          e.stopPropagation()
          onExpand()
        }}
        className={classes.expandButton}
      >
        <ExpandMoreRoundedIcon 
          className={`${expanded ? classes.expanded  : ""} ${classes.expandIcon}`}
        />
      </IconButton>
    </AccordionSummary>
  )
}