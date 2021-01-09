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
            loading={this.props.loading}
            disabled={this.props.disabled}
            fullWidth={this.props.fullWidth}
            endIcon={this.props.endIcon}
            startIcon={this.props.startIcon}
            onClick={this.props.onClick}
            label={this.props.label}
            loading={this.props.loading}
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
            loading={this.props.loading}
            disabled={this.props.disabled}
            fullWidth={this.props.fullWidth}
            endIcon={this.props.endIcon}
            startIcon={this.props.startIcon}
            onClick={this.props.onClick}
            label={this.props.label}
            loading={this.props.loading}
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
      disabled={props.loading || props.disabled}
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
  );
}