import React from 'react';

import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';

export function SignUpBase(props) {

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
    <Box mb={props.bottomMargin}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {props.image}
        <Box width={props.formWidth}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Box
              width={props.formWidth}
            >
              {getItems}
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}