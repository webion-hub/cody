import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { Grid, Typography, Card, CardActionArea } from '@material-ui/core';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "75%",
    "&:hover": {
      maxWidth: "100%"
    },
    transition: "0.25s max-width"
  },
  cardActionArea: {
    padding: theme.spacing(2)
  }
}));

export default function Test() {
  return (
    <Timeline align="left">
      <TimeLineCard
        title="Lezione 1"
        subTitle="Introduzione c++"
        completed
      />
      <TimeLineCard
        title="Lezione 2"
        subTitle="Variabili in c++"
        completed
      />
      <TimeLineCard
        title="Lezione 3"
        subTitle="Stringhe"
        isLast
      />
    </Timeline>
  );
}

function TimeLineCard(props){
  const classes = useStyles();

  const {
    title,
    subTitle,
    isLast,
    completed
  } = props

  const dotComponent = completed ? 
    <TimelineDot color="secondary">
      <CheckCircleRoundedIcon/>
    </TimelineDot>
    :
    <TimelineDot>
      <RadioButtonUncheckedRoundedIcon/>
    </TimelineDot>

  return (
    <TimelineItem>
      <TimelineSeparator>
        {dotComponent}
        {
          isLast ? null : <TimelineConnector />
        }        
      </TimelineSeparator>
      <TimelineContent>
        <Card className={classes.card}>
          <CardActionArea className={classes.cardActionArea}>
            <Grid
              container
              direction="column"
            >
              <Typography variant="h6" color="secondary">
                {title}
              </Typography>
              <Typography variant="subtitle1">
                {subTitle}
              </Typography>
            </Grid>
          </CardActionArea>
        </Card>
      </TimelineContent>
    </TimelineItem>
  )
}