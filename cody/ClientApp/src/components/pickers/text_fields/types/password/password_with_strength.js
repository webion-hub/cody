
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { Password } from 'src/components/pickers/text_fields/types/password/password_textfield';
import { PwStrengthProgress } from 'src/components/pickers/text_fields/types/password/password_strength_progress';

const useStyles = makeStyles((theme) => ({
  password: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  }
}));

export function PasswordWithStrength(props) {
	const classes = useStyles();
  const [password, setPassword] = React.useState(props.defaultValue);

  const getPassword = (value) => {
    setPassword(value);
    props.onChange?.(value)
  }

  
  return (
    <>
      <div className={classes.password}>
        <Password
          {...props}
          onChange={getPassword}
        />
      </div>
      <PwStrengthProgress
        password={password}
      />
    </>
  )
}