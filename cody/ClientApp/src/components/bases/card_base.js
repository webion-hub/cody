import React from 'react';

import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    width: "100%",
    [theme.breakpoints.down('xs')]: {
      maxWidth: "90vw",
    },
  },
  media: {
    height: 140,
	},
	buttons: {
		float: "right"
  },
  cardContent: {
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 4,
  }
}));

export function CardBase(props){
    const classes = useStyles();
  
    return (
      <Card 
        className={classes.root}
        style={{
          background: props.background
        }}
      >
        <CardMedia       
          className={classes.media} 
          image={props.image}
          title={props.title}
        />
        <CardContent className={classes.cardContent}>
					{props.children}
        </CardContent>
        <CardActions className={classes.buttons}>
					{props.button}											
        </CardActions>
      </Card>
    );
  }