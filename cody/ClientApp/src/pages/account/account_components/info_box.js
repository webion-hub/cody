import React from 'react';
import { Box, Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AddPhoto } from 'src/components/pickers/add_photo'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

const useStyles = makeStyles((theme) => ({
	iconMargin: {
		marginRight: theme.spacing(1)
  },
}));

export function InfoBox(props){
	const classes = useStyles();
  const [image, setImage] = React.useState("profile_picture");
  const {onImageChange} = props;
	
  const getImage = (value) => {
    if(value !== "profile_picture"){
      setImage(value);
      onImageChange(value); 
    }
  }

  const handleDelete = () => {
    setImage(null);
    onImageChange(null);
  }
  
	return (
    <Grid
      container
      direction="row"
      alignItems="center"
    >
      <AddPhoto
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
        <Typography variant="caption">
          <Link 
            color="textSecondary"
            component="button"
            onClick={handleDelete}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
            >
              <HighlightOffRoundedIcon className={classes.iconMargin}/>
              Elimina immagine profilo.
            </Grid>
          </Link>
        </Typography>
      </Box>
    </Grid>
	);
}