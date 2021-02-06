import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { AddPhoto } from 'src/components/pickers/add_photo'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

const useStyles = makeStyles((theme) => ({
	iconMargin: {
		marginRight: theme.spacing(1)
  },
  info: {
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down(400)]: {
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(1),
    },
  },
  truncateText: {
    maxWidth: 200,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  }
}));

export function InfoBox(props){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down(400));
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
      direction={mobileView ? "column" : "row"}
      alignItems="center"
      justify="center"
    >
      <AddPhoto
        image={getImage}
        value={image}
        accountEdit
      />
      <div className={classes.info}>
        <Grid
          container
          direction="row"
          alignItems="center"
        >
          <AccountCircleRoundedIcon className={classes.iconMargin}/>
          <Typography
            variant="h5"
            className={classes.truncateText}
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
            className={classes.truncateText}
          >
            {`${props.school.name} - ${props.school.city}`}
          </Typography>	
        </Grid>
        <Typography 
          variant="caption"
          className={classes.truncateText}
        >
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
      </div>
    </Grid>
	);
}