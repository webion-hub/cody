import React from 'react';

import { Grid, IconButton, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';

import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';

import { Question } from 'src/components/illustrations/question';


const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minHeight: "100vh",
    position: "relative",
    background: theme.palette.background.backgroundTransparent,
    minHeight: `calc(100vh - ${theme.appBar.fullHeight}px)`,
    [theme.breakpoints.down('xs')]: {
      minHeight: `calc(100vh - ${theme.appBar.mobileHeight}px)`,
    },
  },
  scrollTop: {
    margin: "0 auto"
  },
  listContainer: {
    width: "auto",
    padding: "0 20%",
    [theme.breakpoints.down('xs')]: {
      padding: "0 10%",
    },
  },
  infoTitle: {
    width: "60%",
    margin: "0 auto",
    [theme.breakpoints.down('xs')]: {
      width: "80%",
    },
  },
  list: {
    listStyleType: "none",
    width: "65%",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
    },
    padding: 0,
    "& li": {
      marginTop: theme.spacing(2),
      "& .description": {
        marginLeft: theme.spacing(6)
      }
    }
  },
  image: {
    position: "absolute",
    width: "50%",
    maxWidth: 1000,
    zIndex: -1,
    bottom: 0,
    right: 0,
  }
}));

export function OrganizationInfo(props){
  const classes = useStyles();
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
 
  return(
		<Grid
      ref={props.innerRef}
      className={classes.pageContainer}
			container
      direction="column"
		>
      <div className={classes.scrollTop}>
        <IconButton onClick={scrollTop}>
          <KeyboardArrowUpRoundedIcon/>
        </IconButton>
      </div>
      {
        mobileView ? 
          <Question size="100vw"/>
          :
          null
      }
      <div
        className={classes.infoTitle}
      >
        <Typography
          variant={mobileView ? "h4" : "h2"}
          component="h2"
        >
          Cosa sono le organizzazioni?
        </Typography>
      </div>
      <div className={classes.listContainer}>
        <Typography
          variant="body1"
          color="textSecondary"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Typography>
        <ul className={classes.list}>
          <li>
            <TitleDescription
              title="Istituti"
              icon={SchoolRoundedIcon}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit vulputate varius. Integer ornare placerat enim eget tincidunt.
            </TitleDescription>
          </li>
          <li>
            <TitleDescription
              title="Teams"
              icon={GroupRoundedIcon}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit vulputate varius. Integer ornare placerat enim eget tincidunt.
            </TitleDescription>
          </li>
          <li>
            <TitleDescription
              title="Aziende"
              icon={BusinessCenterRoundedIcon}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit vulputate varius. Integer ornare placerat enim eget tincidunt.
            </TitleDescription>
          </li>
        </ul>
      </div>
      {
        mobileView ? 
          null
          :
          <div className={classes.image}>
            <Question/>
          </div>
      }
    </Grid>
  );
}


function TitleDescription(props){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  return(
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
      >
        <props.icon fontSize="large" style={{marginRight: 8}}/>
        <Typography
          variant={mobileView ? "h5" : "h4"}
          component="h3"
        >
          {props.title}
        </Typography>
      </Grid>      
      <Typography
        className="description"
        variant="body1"
        color="textSecondary"
      >
        {props.children}
      </Typography>
    </>
  )
}
