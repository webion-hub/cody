import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { VisibilityOff } from '@material-ui/icons';

export function Password(props)
{
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl 
      variant="outlined"
      fullWidth={true}              
    >
      <InputLabel 
        htmlFor="password"
        color="secondary"
      >
        {props.label}
      </InputLabel>
      <OutlinedInput             
        id={props.label}
        color="secondary"  
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}                
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={props.labelWidth}
      />
    </FormControl>  
  );
}