import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AddPhoto } from 'src/components/pickers/add_photo'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';

const useStyles = makeStyles((theme) => ({
	iconMargin: {
		marginRight: theme.spacing(1)
	},
}));

export function InfoBox(props){
	const classes = useStyles();
  const [image, setImage] = React.useState("profile_picture");
	
  const getImage = (value) => {
    if(value !== "profile_picture"){
      setImage(value);
      const {onImageChange} = props;
      onImageChange(value); 
    }
  }
  
	return (
    <Grid
      container
      direction="row"
      alignItems="center"
    >
      <AddPhoto
        size={100}
        iconSize={40}
        image={getImage}
        value={image}
        accountEdit
      />
      <Box pl={4}>
        <Grid
          container
          direction="row"
          alignItems="center"
        >
          <AccountCircleRoundedIcon className={classes.iconMargin}/>
          <Typography
            variant="h5"
          >
            {props.username}
          </Typography>	
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
        >
          <SchoolRoundedIcon className={classes.iconMargin}/>
          <Typography
            variant="subtitle1"
          >
            {props.school.name}
          </Typography>	
        </Grid>
      </Box>
    </Grid>
	);
}