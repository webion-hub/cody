import React from 'react';

import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';


export function LoadingButton(props){
  const disabledButton = props.loading || props.disabled

  const mainButton = 
    <Button
      variant="contained"
      color="primary"
      disabled={disabledButton}
      className={props.className}
      fullWidth={props.fullWidth}
      endIcon={props.endIcon}
      startIcon={props.startIcon}
      onClick={props.onClick}
    >
      {
        props.loading ? 
        (
          <CircularProgress
            color="secondary"
            size={25}
            style={{
              position: "absolute" 
            }}
          />
        ): null
      }
      {props.label}
    </Button>

  return (
    props.fullWidth ? 
      <Box width={1}>
        {mainButton}
      </Box>
      : 
      <span>
        {mainButton}
      </span>   
  ) 
}