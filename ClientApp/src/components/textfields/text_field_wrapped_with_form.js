
import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%"
  }
}));

export function TextFieldWrappedWithForm(props) {
	const classes = useStyles();

  return (
    <form className={classes.form}>
      <TextField
        {...props}
      />
    </form>
  )
}