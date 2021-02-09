import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ClassCard } from 'src/components/cards/class_card';
import { School } from 'src/components/illustrations/school';
import { ThereAreClasses } from './thereAreClasses';
import { NoClasses } from './noClasses';

import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';


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

  return (
    <div className={props.className}>
      <div className={classesNumber === 0 ? classes.emptyBox : classes.classesBox}>
        {
          classesNumber === 0 ? (
            null
          ):(
            <Typography variant="h4" color="textSecondary" className={classes.title}>
              <SchoolRoundedIcon className={classes.titleIcon}/>
                Le classi a cui sei iscritto
            </Typography>
          )
        }
        <>
          {
            classesNumber === 0 ? (
              <NoClasses/>
            ):(
              <ThereAreClasses
                classesList={props.classesList}
              />
            )
          }
        </>
      </div>
    </div>
  );

}