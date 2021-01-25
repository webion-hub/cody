import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'

import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';


export class LoadingButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      this.props.fullWidth ? (
        <Box width={1}>
          <MainButton
            variant="contained"
            color="primary"
            props={this.props}
          />
          {
            this.props.navigateToHome ? (<Redirect to={this.props.href}/>) : null
          } 
        </Box>
      ) : (
        <span>
          <MainButton
            variant="contained"
            color="primary"
            props={this.props}
          />
          {
            this.props.navigateToHome ? (<Redirect to={this.props.href}/>) : null
          } 
        </span>
      )

    )
  }
}


function MainButton(props){
  return(
    <Button
      variant="contained"
      color="primary"
      disabled={props.props.loading || props.props.disabled}
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