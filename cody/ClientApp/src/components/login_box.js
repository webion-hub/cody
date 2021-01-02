import React from 'react';
import { TextField } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core/';

import { Password } from './password_textfield'

import { makeStyles } from '@material-ui/core/styles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';


const useStyles  = makeStyles({
  checkBox: {
    color: "rgba(255,255,255,0.6)"
  },
  forgotPassword: {
    fontSize: 12
  },
});


export function LoginBox(props){
    const classes = useStyles();

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
            <Password
              label="Password"
              labelWidth= {70}
            />     
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
