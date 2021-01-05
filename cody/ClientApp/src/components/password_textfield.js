import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { VisibilityOff } from '@material-ui/icons';


export class Password extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    }
  }
  
  handleChange = (prop) => (event) => {
    this.setState({[prop]: event.target.value })
    
    const {onChange} = this.props;
    onChange(event.target.value);
  };

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword })
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <FormControl 
        variant="outlined"
        fullWidth={true}
      >
        <InputLabel 
          htmlFor="password"
          color="secondary"
          error={this.props.error}
        >
          {this.props.label}
        </InputLabel>
        <OutlinedInput
          id={this.props.label}
          color="secondary"
          type={this.state.showPassword ? 'text' : 'password'}
          value={this.state.password}
          onChange={this.handleChange('password')}
          error={this.props.error}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
                edge="end"
              >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={this.props.labelWidth}
        />
      </FormControl>
    );
  }
}