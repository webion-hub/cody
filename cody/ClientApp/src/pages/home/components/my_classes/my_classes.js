import React from 'react';
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core'

import { ThereAreClasses } from './thereAreClasses';
import { NoClasses } from './noClasses';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  classesBox: {
    position: "relative",
    margin: "0 auto",
  },
  areClassesBox: {
    margin: "0 auto",
    maxWidth: "calc(100vw - 48px)",
    [theme.breakpoints.down('xs')]: {
      maxWidth: "100vw",
    },
  },
  noClassesBox: {
    maxWidth: 900,
    margin: "0 auto",
  },
  titleLeft: {
    textAlign: "left",
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(2),
  },
  titleCenter: {
    textAlign: "center",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
    maxWidth: "calc(100vw - 96px)",
    margin: "0 auto"
  }
}));


export function MyClasses(props){
  const classes = useStyles();
  const theme = useTheme();

  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const classesList = props.classesList;
  const classesNumber = classesList.length; 

  const areClasses = classesNumber !== 0;
  const className = `${areClasses ? classes.areClassesBox : classes.noClassesBox} ${classes.classesBox}`


  const title = areClasses ?
    <Typography 
      variant={mobileView ? "h4" : "h3"} 
      color="textPrimary" 
      className={`
        ${mobileView ? classes.titleCenter : classes.titleLeft}  
      `}
    >
        Le classi a cui sei iscritto
    </Typography>
    : 
    null

  const content = areClasses ?
    <ThereAreClasses
      classesList={props.classesList}
    /> 
    : 
    <NoClasses/>

  return (
    <div className={props.className}>
      <div className={className}>
        {title}
        {content}
      </div>
    </div>
  );

}