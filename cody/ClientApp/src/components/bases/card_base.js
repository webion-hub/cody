import React from 'react';

import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
        className={props.className}
      >
        {
          props.loading ? (
            <Skeleton variant="rect" animation="wave" height={140}/>
          ) : (
            <CardMedia       
              className={classes.media} 
              image={props.image}
              title={props.title}
            />
          )
        }

        <CardContent className={classes.cardContent}>
					{props.children}
        </CardContent>
        <CardActions className={classes.buttons}>
          {
            props.loading ? (
              <Skeleton animation="wave" width={75} height={30}/>
            ):(
              props.button
            )
          }											
        </CardActions>
      </Card>
    );
  }