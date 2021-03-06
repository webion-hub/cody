import React from 'react';

import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';


export function LoadingButton(props){

  const mainButton = 
    <MainButton
      props={props}
    />

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


function MainButton(props){
  const disabledButton = props.props.loading || props.props.disabled

  return(
    <Button
      variant="contained"
      color="primary"
      disabled={disabledButton}
      fullWidth={props.props.fullWidth}
      endIcon={props.props.endIcon}
      startIcon={props.props.startIcon}
      onClick={props.props.onClick}
    >
      {
        props.props.loading ? 
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
      {props.props.label}
    </Button>
  );
}