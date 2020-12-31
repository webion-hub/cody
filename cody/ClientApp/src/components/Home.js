import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';


function Illustration(props){
  return (
    <Box width={props.size}>
      <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 400 300"><title>#13 authentication</title><rect x="94" y="34.9" width="231.9" height="165.34" transform="translate(419.89 235.15) rotate(-180)" fill="#e6e6e6"/><rect x="170.69" y="139.8" width="77" height="18.57" fill="#fff"/><circle cx="184.56" cy="149.26" r="2.31" fill="#24285b"/><circle cx="196.67" cy="149.26" r="2.31" fill="#24285b"/><circle cx="209.58" cy="149.26" r="2.31" fill="#24285b"/><circle cx="221.69" cy="149.26" r="2.31" fill="#24285b"/><circle cx="233.81" cy="149.26" r="2.31" fill="#24285b"/><rect x="179.36" y="80.96" width="58.85" height="40.89" fill="#a5a5a5" opacity="0.4"/><path d="M128,178.78s4.27,19.77,15.54,18.75,15-33.24,15-33.24l-4.14-3.89Z" fill="#f4a28c"/><path d="M117,134.09s24.28,3.61,26.58,30.2l-15.93,6.81Z" fill="#3366ff"/><path d="M127.65,171.1l-10.65-37s24.28,3.61,26.58,30.2" fill="#fff" opacity="0.2"/><path d="M210,137.93l7.12,11.84-9.59,5.4-7.79-14L189,146.55l8,15-10.15,5.93-7.16-12.33-5,3.74a11.15,11.15,0,0,0-4.44,9.6c.48,8.13.5,22.76-4.52,31.42l-33.51.32,3.84-30.62L100,136.31l-4.46-14.69-2.84-13.54,6.45-3.44a5.88,5.88,0,0,1,6.35.52c2.35,1.81,4.76,4.93,3.39,9.76-2.42,8.56-1.08,18,4.53,19.3s28.61-5.66,33.69,7.17,7.75,13.9,20.05,3.75S200,124.92,200,124.92Z" opacity="0.08"/><ellipse cx="208.79" cy="262.1" rx="155.3" ry="11.35" fill="#e6e6e6" opacity="0.45"/><path d="M93.85,253.83s-2,2.47-.83,4.92-.72,4.43-2.57,2.68-2.38-8.77-2.38-8.77l3.46-1.85Z" fill="#3366ff"/><path d="M153.07,235.76s1.24,3,4,3,3.58,2.7,1.17,3.52-8.86-2-8.86-2l0-3.93Z" fill="#3366ff"/><path d="M95.07,111s3.34,4.9,4.4,8.81a3,3,0,0,1-2.11,3.65,6.6,6.6,0,0,1-6.91-1.79L86.37,118a5.33,5.33,0,0,1-.75-6.11C87.35,108.17,93.18,107.9,95.07,111Z" fill="#f4a28c"/><polygon points="88.21 117.87 90.92 134 101.85 134.5 95.49 121.9 88.21 117.87" fill="#f4a28c"/><path d="M93.9,111.92a23.14,23.14,0,0,1-5,2.31A4.94,4.94,0,0,1,91.6,119a3.91,3.91,0,0,1-1.07,2.57A2.11,2.11,0,0,1,87.2,121l-2.7-4.94a6.05,6.05,0,0,1,0-6.19,21.93,21.93,0,0,1,1.6-2.33c1.48-1.84,5-2.14,6-4.4a1.44,1.44,0,0,1,2.44-.29c1.43,1.85,2.86,5.23.75,7.87A5.75,5.75,0,0,1,93.9,111.92Z" fill="#24285b"/><path d="M92.07,118.49s-1.16-2-2.57-1,.25,3.85,2.43,3Z" fill="#f4a28c"/><path d="M97,114.17l2.56,1.18a1,1,0,0,1,.22,1.59L98,118.43Z" fill="#f4a28c"/><path d="M96.44,123.8a7.26,7.26,0,0,1-3.79-.8s.31,4.24,5.61,4.41Z" fill="#ce8172" opacity="0.31"/><path d="M72.38,139.9c14.36-9.47,38.55-11.46,52.25-2,13.51,9.28,7,64.18,7,64.18l-28.05,8.45S49.36,170.1,72.38,139.9Z" fill="#3366ff"/><path d="M99.09,211l4.08,9.84a20.72,20.72,0,0,1-4,16.48L89,250.43l5.61,4,14.74-11.74a25.77,25.77,0,0,0,9.72-20l0-5-1.83-6.42Z" fill="#24285b"/><path d="M89,143.15s10.64,5,9.22,21.14-1.42,35.1,23.75,34.14v8.45l-16.49,2.48-19.65-19-1.7-29.2Z" opacity="0.08"/><polygon points="134.74 193.35 137.42 195.82 153.31 162.89 133.21 176.26 134.74 193.35" opacity="0.08"/><path d="M108.84,218.47l5.46,3.58,20.1-6.22a7.52,7.52,0,0,1,9.53,5.4l3.72,15.32,6.82-.57-2.21-20.7a15.33,15.33,0,0,0-15-13.7l-15.51-.21Z" fill="#24285b"/><path d="M208.11,144.83,218,138.9l-14.38-24L127,166.52a28.31,28.31,0,1,0,6.34,9.63L181,144l9.38,14.53,9.68-6.25-9.5-14.72,9.41-6.33ZM107,203.37a16.8,16.8,0,1,1,16.8-16.8A16.82,16.82,0,0,1,107,203.37Z" fill="#ffd200"/><path d="M89.25,150.6c1-10.61-12-16.55-19.26-8.71-5.8,6.29-11.29,16.9-10.75,34.35,1.11,36,11.81,44.46,39,42.72a15.91,15.91,0,0,0,9.57-1.11,2.4,2.4,0,0,0-.61-4.48c-3.06-.6-6.89-1-9,.17,0,0-24.85-7.86-17.55-37.23C80.71,176.31,88.08,162.89,89.25,150.6Z" fill="#f4a28c"/><path d="M69.77,141.55c-5.16,4.27-11.45,12.68-11.34,28.26l25.74,2.88s15-24.94,1.26-32.78A13.89,13.89,0,0,0,69.77,141.55Z" fill="#3366ff"/><path d="M69.77,141.55c-5.16,4.27-11.45,12.68-11.34,28.26l25.74,2.88s15-24.94,1.26-32.78A13.89,13.89,0,0,0,69.77,141.55Z" fill="#fff" opacity="0.2"/><path d="M153.31,162.89s6.12-7.52,9.61-4.45S160,170.77,153.31,162.89Z" fill="#f4a28c"/><polygon points="59.31 169.91 59.31 177.49 80.71 176.31 82.52 172.69 59.31 169.91" opacity="0.08"/><circle cx="110.77" cy="47.35" r="4.84" fill="#24285b"/><circle cx="125.17" cy="47.35" r="4.84" fill="#3366ff"/><circle cx="138.74" cy="47.35" r="4.84" fill="#ffd200"/><path d="M231.05,81h-6.88V77.43a15.38,15.38,0,1,0-30.76,0V81h-6.88V77.43a22.26,22.26,0,0,1,44.52,0Z" fill="#fff"/><circle cx="209.55" cy="94.37" r="5.76" fill="#a5a5a5"/><rect x="206.71" y="97.33" width="6.31" height="15.35" fill="#a5a5a5"/><rect x="193.01" y="168.46" width="31.56" height="15.69" fill="#24285b"/><rect x="210.15" y="171.1" width="11.03" height="5.2" fill="#fff" opacity="0.13"/><path d="M319.18,244.75S307.6,241.64,305,230.88c0,0,17.91-3.7,18.5,14.8Z" fill="#3366ff" opacity="0.58"/><path d="M320.6,243.59s-8.14-12.74-1.07-24.73c0,0,13.67,8.61,7.68,24.73Z" fill="#3366ff" opacity="0.73"/><path d="M322.68,243.59s4.22-13.51,17.12-16.12c0,0,2.46,8.75-8.29,16.12Z" fill="#3366ff"/><polygon points="314.29 243.33 316.7 259.37 331.48 259.37 333.59 243.33 314.29 243.33" fill="#24285b"/></svg>    
    </Box>  
  );
}

function LoginbBox(props){
  return (
    <Box width={props.size}>
      <Grid
        container
        direction="column"   
        justify="center"
        alignItems="center"
      >
        <Typography 
          variant="h4" 
          component="h1"
        >
          Accedi...
        </Typography>
        <Box m={1}/>         
        <TextField
            id="username"
            label="Username"
            variant="filled"
            color="secondary"
        />
        <Box m={1}>
          <Grid
            container
            direction="column"
          >
            <TextField
              id="password"
              label="Password"
              variant="filled"
              color="secondary"
            />
            <Box m={0.25}>
              <Link
                style={{fontSize: 12}}
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
        </Box>         
        <Button variant="contained" color="primary">
          Accedi
        </Button>  
      </Grid> 
    </Box>
  );
}


export class Home extends Component {
  static displayName = Home.name;
  render () {
    return (   
      <Grid
        style={{height: "100vh"}}
        container
        justify="center"
        alignItems="center"
      >
        <Paper elevation={3}>
          <Box p={3}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >      
              <Illustration size={300}/>
              <LoginbBox size={300}/>
            </Grid>
          </Box>
        </Paper> 
      </Grid>
    );
  }
}
