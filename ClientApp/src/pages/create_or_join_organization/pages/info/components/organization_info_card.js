import { Grid, Typography, Card, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMobileView } from 'src/lib/hooks/use_mobile_view';

const useStyles = makeStyles((theme) => ({
  organizationCardPaper: {
    backgroundColor: theme.palette.background[700],
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
  organizationCardContainer: {
    padding: theme.spacing(2)
  },
  textBoxContainer: {
    width: "calc(100% - 250px)",
    [theme.breakpoints.down('xs')]: {
      width: "100%"
    },
  }
}));

export function OrganizationsInfoCard(props){
  const classes = useStyles();
  const mobileView = useMobileView()
  
  return (
    <Card 
      className={classes.organizationCardPaper}
      elevation={0}
    >
      <CardActionArea>
        <Grid
          className={classes.organizationCardContainer}
          container
          direction={mobileView ? "column" : "row"}
          alignItems="center"
        >
          <props.image 
            boxProps={{
              maxWidth: 200
            }}
          />
          <Grid
            className={classes.textBoxContainer}
            container
            direction="column"
          >
            <Typography variant="h4">
              {props.title}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
            >
              {props.description}
            </Typography>
          </Grid>              
        </Grid>
      </CardActionArea>
    </Card>
  )
}