import React from 'react';
import { Grid, Typography, Link, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { AddPhoto } from 'src/components/pickers/add_photo'
import { FlowingText } from 'src/components/typography/flowing_text'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: `${theme.spacing(2)}px 0px`,
    background: theme.palette.background.paperDark
  },
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
  deleteProfilePic: {
    maxWidth: 200,
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
    <Paper className={classes.paper}>
      <Grid
        container
        direction={mobileView ? "column" : "row"}
        alignItems="center"
        justify="center"
      >
        <AddPhoto
          alt={props.username}
          image={getImage}
          value={image}
          accountEdit
        />
        <div className={classes.info}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify={mobileView ? "center" : null}
          >
            {
              props.loading ? 
                <Skeleton width={180} animation="wave" variant="rect"/>
                :
                <>
                  <AccountCircleRoundedIcon className={classes.iconMargin}/>
                  <FlowingText
                    containerWidth={200}
                    background={theme.palette.background.paperDark}
                    variant="h5"
                  >
                    {props.username}
                  </FlowingText>
                </>
            }
          </Grid>          
          {
            props.school?
              <Grid
                container
                direction="row"
                alignItems="center"
                justify={mobileView ? "center" : null}
              >
                {
                  props.loading ? 
                    <Skeleton width={180} animation="wave" variant="rect"/>
                    :
                    <>
                      <SchoolRoundedIcon className={classes.iconMargin}/>
                      <FlowingText
                        containerWidth={200}
                        background={theme.palette.background.paperDark}
                        variant="h5"
                      >
                        {`${props.school.name} - ${props.school.city}`}
                      </FlowingText>
                    </>
                }
              </Grid>
              :
              null
          }
          <Typography 
            variant="caption"
            className={classes.deleteProfilePic}
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
                justify={mobileView ? "center" : null}
              >
                {
                  props.loading ? 
                    <Skeleton width={180} animation="wave" variant="rect"/>
                    :
                    <>
                      <HighlightOffRoundedIcon className={classes.iconMargin}/>
                      Elimina immagine profilo.
                    </>
                }
              </Grid>
            </Link>
          </Typography>
        </div>
      </Grid>
    </Paper>
	);
}