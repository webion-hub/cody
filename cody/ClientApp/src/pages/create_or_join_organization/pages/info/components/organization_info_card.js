import React from 'react';

import { Grid, Typography, Card, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  organizationCardPaper: {
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
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));
  
  return (
    <Card className={classes.organizationCardPaper}>
      <CardActionArea>
        <Grid
          className={classes.organizationCardContainer}
          container
          direction={mobileView ? "column" : "row"}
          alignItems="center"
        >
          <props.image maxWidth={200} size="100%"/>
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