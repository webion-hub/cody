import makeStyles from '@material-ui/core/styles/makeStyles';

import useTheme from '@material-ui/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';

const useStyles = makeStyles((theme) => ({
  openCourseIcon: {
    marginLeft: -theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  title: {
    width: "calc(100% - 64px)"
  },
  titleContainer: {
    width: "70%",
    [theme.breakpoints.down('md')]: {
      width: "100%"
    },
  },
  teachersContainer: {
    width: "30%",
    [theme.breakpoints.down('md')]: {
      width: "100%"
    },
  },
  teachers: {
    width: "100%"
  },
  teachersLabel: {
    width: "100%"
  },
  accordionSummary: {
    width: 0
  }
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
      classes={{
        content: classes.accordionSummary
      }}
      expandIcon={<ExpandMoreRoundedIcon />}
    >
      <Grid
        container
        direction={smallScreenView ? "column" : "row"}
        justify="space-between"
        alignItems={smallScreenView ? "flex-start" : "center"}
      >
        <Grid
          className={classes.titleContainer}
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
            className={classes.title}
          >
            {title}
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          className={classes.teachersContainer}
        >
          <Typography
            className={classes.teachersLabel}
            variant="caption"
            align={smallScreenView ? "left" : "right"}
            color="textSecondary"
            noWrap
          >
            Professori
          </Typography>
          <Typography
            className={classes.teachers}
            align={smallScreenView ? "left" : "right"}
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