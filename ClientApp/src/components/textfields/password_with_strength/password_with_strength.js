
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Password } from 'src/components/textfields/password';
import { PwStrengthProgress } from './components/pw_strength_progress';

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