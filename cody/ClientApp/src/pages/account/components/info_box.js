import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { FlowingText } from 'src/components/typography/flowing_text'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import Skeleton from '@material-ui/lab/Skeleton';

import { EditableBiography } from 'src/components/pickers/text_fields/editable_text_fields/editable_biography';
import { useGetSize } from 'src/lib/hooks/use_get_size';
import { AvatarAddPhoto } from 'src/components/pickers/others/avatar_add_photo';

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
  const flowingTextMobileMaxWidth = screenWidth - 196;
  const flowingTextBigScreenMaxWidth = 165;
  const flowingTextMaxWidth = mobileView? 
    flowingTextMobileMaxWidth: flowingTextBigScreenMaxWidth

  const {onImageChange} = props;
  

	useEffect(() => {
		if(!props.loading && data === undefined)
      setData(props.data)

    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.loading, data])

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
        <AvatarAddPhoto
          loading={props.loading}
          onImageChange={getImage}
          onImageDelete={handleDelete}
          src={image}
          alt={props.oldData.username}
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
                  width={flowingTextMaxWidth} animation="wave" variant="rect"
                />
                :
                <>
                  <AccountCircleRoundedIcon className={classes.iconMargin}/>
                  <FlowingText
                    containerWidth={flowingTextMaxWidth}
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
                      width={flowingTextMaxWidth} animation="wave" variant="rect"
                    />
                    :
                    <>
                      <SchoolRoundedIcon className={classes.iconMargin}/>
                      <FlowingText
                        containerWidth={flowingTextMaxWidth}
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