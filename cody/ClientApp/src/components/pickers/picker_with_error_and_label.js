import React from 'react';
import { Fade, Grid, Typography } from '@material-ui/core';

export function PickerWithErrorAndLabel(props){
  const {
    children,
    fadeError,
    errorMessage,
    leftMessage,
    leftMessageColor,
  } = props
  
  const areErrors = 
    fadeError ?? false

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { error: child.props.error || areErrors }),
  );

  return (
    <>
      {childrenWithProps}
      <Grid
        container
        direction="row"
        justify="space-between"
      >
        <Typography
          variant="caption"
          color={leftMessageColor}
        >
          {leftMessage ?? " "}
        </Typography>
        <Fade
          in={areErrors}
        >
          <Typography
            variant="caption"
            color="error"
          >
            {errorMessage ?? " "}
          </Typography>
        </Fade>
      </Grid>
    </>
  )
}

PickerWithErrorAndLabel.defaultProps = {
  leftMessageColor: "textSecondary"
}