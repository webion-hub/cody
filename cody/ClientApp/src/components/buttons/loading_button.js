import React from 'react';

import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

export function LoadingButton(props){
  const {variant, color, loading, label, fullWidth, ...otherProps} = props;
  const disabledButton = props.loading || props.disabled

  const loadingAnimation = loading &&        
    <CircularProgress
      color="secondary"
      size={25}
      style={{
        position: "absolute" 
      }}
    />

  const mainButton = 
    <Button
      {...otherProps}
      variant={variant ? variant : "contained"}
      color={color ? color : "primary"}
      disabled={disabledButton}
      fullWidth={fullWidth}
    >
      {loadingAnimation}
      {label}
    </Button>

  return (
    fullWidth ? 
      <Box width={1}>
        {mainButton}
      </Box>
      : 
      <span>
        {mainButton}
      </span>   
  ) 
}