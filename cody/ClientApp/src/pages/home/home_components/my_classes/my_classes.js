import React from 'react';

import { ThereAreClasses } from './thereAreClasses';
import { NoClasses } from './noClasses';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';


const classesStyles = makeStyles((theme) => ({
  classesBox: {
    maxWidth: "100vw",
    margin: "0 auto",
  },
  emptyBox: {
    maxWidth: 900,
    margin: "0 auto",
  },
  titleIcon: {
    marginRight: 15,
    height: 30,
    width: 30
  },
  title: {
    textAlign: "center"
  }
}));


export function MyClasses(props){
  const classes = classesStyles();
  const classesList = props.classesList;
  const classesNumber = classesList.length; 

  const areClasses = classesNumber !== 0;

  const title = areClasses ?
    <Typography variant="h4" color="textSecondary" className={classes.title}>
      <SchoolRoundedIcon className={classes.titleIcon}/>
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
      <div className={areClasses ? classes.classesBox : classes.emptyBox}>
        {title}
        {content}
      </div>
    </div>
  );

}