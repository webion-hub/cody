import React from 'react';

import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flip: {
    transform: "scaleX(-1)",
  },
}));


export function BasePhotoText(props) {
  const classes = useStyles();

  const items = props.items;
  const getItems = items.map((item, index) => 
    <Box 
      key={index}
      mb={props.margin}
    >
      {item}
    </Box>
  );
  
  return (
    <Box mb={props.bottomMargin?props.bottomMargin : 0}>
      <Grid
        container
        direction={props.reverse ? "row-reverse" : "row"}
        justify="center"
        alignItems="center"
      >
        <div className={props.flipImage ? classes.flip : null}>
          {props.image}
        </div>        
        <Box maxWidth={props.formWidth}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Box
              maxWidth={props.formWidth}
            >
              {getItems}
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}