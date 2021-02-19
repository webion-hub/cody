import React, { useEffect } from 'react';
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

import { EditableBiography } from 'src/components/pickers/text_fields/editable_text_fields/editable_biography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    background: theme.palette.background.paperDark,
    height: "100%",
    [theme.breakpoints.down('xs')]: {
      width: `calc(100vw - ${theme.spacing(2)}px)`,
    },
  },
	iconMargin: {
		marginRight: theme.spacing(1)
  },
  info: {
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.down(360)]: {
      marginLeft: 0,
      marginTop: theme.spacing(2)
    },
  },
  deleteProfilePic: {
    maxWidth: 200,
  },
  biography: {
    paddingTop: theme.spacing(4),
    maxWidth: 340,
  }
}));

export function InfoBox(props){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));
  const smallestView = useMediaQuery(theme.breakpoints.down(360));
	const classes = useStyles();
  const [image, setImage] = React.useState("user/profile_picture");
  const [data, setData] = React.useState(undefined);
  const {onImageChange} = props;

	useEffect(() => {
		if(!props.loading && data === undefined)
    setData(props.data)
	})

  const getValue = (dataName) => (value) => {	
    const updateData = {
			...data,
			[dataName]: value,
		}
		
    setData(updateData);
		
		const {onDataChange} = props;
		onDataChange(updateData); 
  }

  const getImage = (value) => {
    if(value !== "user/profile_picture"){
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
        direction={smallestView ? "column" : "row"}
        alignItems={mobileView ? "flex-start" : "center"}
      >
        <AddPhoto
          alt={props.oldData.username}
          image={getImage}
          value={image}
          accountEdit
          imageSize={mobileView ? 75 : null}
        />
        <div className={classes.info}>
          <Grid
            container
            direction="row"
            alignItems="center"
          >
            {
              props.loading ? 
                <Skeleton width={200} animation="wave" variant="rect"/>
                :
                <>
                  <AccountCircleRoundedIcon className={classes.iconMargin}/>
                  <FlowingText
                    containerWidth={200}
                    background={theme.palette.background.paperDark}
                    variant="h5"
                  >
                    {props.oldData.username}
                  </FlowingText>
                </>
            }
          </Grid>          
          {
            props.oldData.school?
              <Grid
                container
                direction="row"
                alignItems="center"
              >
                {
                  props.loading ? 
                    <Skeleton width={200} animation="wave" variant="rect"/>
                    :
                    <>
                      <SchoolRoundedIcon className={classes.iconMargin}/>
                      <FlowingText
                        containerWidth={200}
                        background={theme.palette.background.paperDark}
                        variant="h6"
                      >
                        {`${props.oldData.school.name} - ${props.oldData.school.city}`}
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
              >
                {
                  props.loading ? 
                    <Skeleton width={200} animation="wave" variant="rect"/>
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
      <div className={classes.biography}>
        {
          props.loading? 
            <>
              <Skeleton width="100%" animation="wave"/>
              <Skeleton width="100%" animation="wave"/>
              <Skeleton width="100%" animation="wave"/>
            </>
            :
            <EditableBiography
              title="Cambia biografia"
              value={props.oldData.biography}
              onChange={getValue("biography")}
            />
        }
      </div>
    </Paper>
	);
}