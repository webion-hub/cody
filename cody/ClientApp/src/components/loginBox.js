import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core/';
import { IconButton } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { VisibilityOff } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';



const useStyles  = makeStyles({
  checkBox: {
    color: "grey"
  },
  forgotPassword: {
    fontSize: 12
  },
});

export function LoginBox(props){
    const classes = useStyles();
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
      <Box width={props.size}>
        <Grid
          container
          direction="column"   
          justify="center"
          alignItems="center"
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"            
          >
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              color="secondary"
              fullWidth={true} 
            />  
            <Box m={0.5}/>  
            <FormControl 
              variant="outlined"
              fullWidth={true}              
            >
              <InputLabel 
                htmlFor="password"
                color="secondary"
              >
                Password
              </InputLabel>
              <OutlinedInput             
                id="password"
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
                labelWidth={70}
              />
            </FormControl>                      
            <Grid
              container
              justify="flex-start"
            >
              <FormControlLabel
                value="end"
                control={
                  <Checkbox 
                    color="secondary" 
                    size="small"
                    className ={classes.checkBox}
                  />
                }
                label={          
                <Typography 
                  variant="body2" 
                  className ={classes.checkBox}
                >
                  Ricordami
                </Typography>
                }
                labelPlacement="end"
              />   
            </Grid>           
          </Grid>            
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"            
          >
            <Button 
              variant="contained" 
              color="primary"  
              fullWidth={true}          
              endIcon={<AccountCircleRoundedIcon/>}        
            >
              Accedi
            </Button> 
            <Box mt={1}>
              <Link
                className={classes.forgotPassword}
                component="button"
                variant="body2"
                color="secondary"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
                Password dimenticata?
              </Link> 
            </Box>
          </Grid>    
        </Grid> 
      </Box>
    );
  }
