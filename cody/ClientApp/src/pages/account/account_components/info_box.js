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
import { useGetSize } from 'src/lib/hooks/use_get_size';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 364,
    padding: theme.spacing(2),
    height: "100%",
    [theme.breakpoints.down('xs')]: {
      width: `calc(100vw - ${theme.spacing(4)}px)`,
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
  },
  deleteProfilePic: {
    maxWidth: 200,
  },
  biography: {
    paddingTop: theme.spacing(4),
    width: "100%",
  },
  biographyPaper: {
    padding: theme.spacing(1),
    background: theme.palette.background.paperSecondary,
  }
}));

export function InfoBox(props){
	const classes = useStyles();
  const theme = useTheme();
  
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const [image, setImage] = React.useState(props.defaultImage);
  const [data, setData] = React.useState(undefined);

  const screenWidth = useGetSize(window).width;
  const flowingTextMobileMaxWidth = screenWidth - 196

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
    setImage(value);
    onImageChange(value); 
  }

  const handleDelete = () => {
    setImage(null);
    onImageChange(null);
  }
  
	return (
    <div className={classes.container}>
      <Grid
        container
        direction={"row"}
        alignItems={"center"}
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
                <Skeleton 
                  width={mobileView? flowingTextMobileMaxWidth: 200} animation="wave" variant="rect"
                />
                :
                <>
                  <AccountCircleRoundedIcon className={classes.iconMargin}/>
                  <FlowingText
                    containerWidth={
                      mobileView? flowingTextMobileMaxWidth: 200
                    }
                    background={theme.palette.background.paper}
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
                    <Skeleton 
                      width={mobileView? flowingTextMobileMaxWidth: 200} animation="wave" variant="rect"
                    />
                    :
                    <>
                      <SchoolRoundedIcon className={classes.iconMargin}/>
                      <FlowingText
                        containerWidth={
                          mobileView? flowingTextMobileMaxWidth: 200
                        }
                        background={theme.palette.background.paper}
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
                    <Skeleton 
                      width={mobileView? flowingTextMobileMaxWidth: 200} animation="wave" variant="rect"
                    />
                    :
                    <>

                      <HighlightOffRoundedIcon className={classes.iconMargin}/>                      
                      <FlowingText
                        containerWidth={
                          mobileView? flowingTextMobileMaxWidth: 200
                        }
                        background={theme.palette.background.paper}
                        variant="caption"
                      >
                        Elimina immagine profilo.
                      </FlowingText>
                    </>
                }
              </Grid>
            </Link>
          </Typography>
        </div>
      </Grid>
      <div className={classes.biography}>
        <Paper className={classes.biographyPaper}>
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
        </Paper>
      </div>
    </div>
	);
}