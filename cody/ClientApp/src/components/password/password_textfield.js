import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { VisibilityOff } from '@material-ui/icons';


export function Password(props){
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  
  const handleChange = (event) => {
    setPassword(event.target.value)
    
    const {onChange} = props;
    onChange(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
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
        required={props.required}
        htmlFor="password"
        color="secondary"
        error={props.error}
      >
        {props.label}
      </InputLabel>
      <OutlinedInput
        id={props.label}
        name={props.name}
        color="secondary"
        type={showPassword ? 'text' : 'password'}
        value={props.value === "" ? password : props.value}
        defaultValue={props.defaultValue === "" ? password : props.defaultValue}
        onChange={handleChange}
        onKeyDown={props.onKeyDown}
        error={props.error}
        autoFocus={props.autoFocus}
        inputRef={props.inputRef}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={props.labelWidth}
      />
    </FormControl>
  );
}