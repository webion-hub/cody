import React from 'react';

import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Form } from 'src/lib/default_values/sizes/form_size';

const useStyles = makeStyles((theme) => ({
  flipImage: {
    transform: "scaleX(-1)",
  },
}));


export function BasePhotoText(props) {
  const classes = useStyles();

  const propsItems = props.items? props.items : [];
  const items = propsItems.map((item, index) => 
    <Box 
      key={index}
      mb={props.margin}
      width="100%"
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
        {
          props.flipImage ? 
            <div className={classes.flipImage}>
              <props.image size={Form.width}/>
            </div>
            :
            <props.image size={Form.width}/>
          }        
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{maxWidth: Form.width}}
        >
          {items}
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
}