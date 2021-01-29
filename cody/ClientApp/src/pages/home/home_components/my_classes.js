import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ClassCard } from '../../../components/cards/class_card';

import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';

const classesStyles = makeStyles((theme) => ({
  classesListStyle: {
    display: "flex",
    padding: 0,
  },
  class: {
    display: "inline-block",
    paddingLeft: 20,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "5vw",
    },
  },
  classesBox: {
    maxWidth: "75vw",
    [theme.breakpoints.down('xs')]: {
      maxWidth: "100vw",
    },
    margin: "0 auto",
  },
}));


export function MyClasses(props){
  const classes = classesStyles();
  const classesList = props.classesList;

  return (
    <div className={props.className}>
      <div className={classes.classesBox}>
        <Typography variant="h4">
          <SchoolRoundedIcon style={{marginRight: 15, height: 30, width: 30}}/>
          Le classi a cui sei iscritto
        </Typography>
        <Paper>
          <ScrollContainer>
            <ul className={classes.classesListStyle}>
              {
                classesList.map((data, index) => {
                  return (
                    <li 
                      key={index}
                      className={classes.class}
                    >
                      <ClassCard
                        image={data.image}
                        title={data.title}
                        languageIcon={data.icon}
                        admin={data.admin}
                        users={data.users}
                      />
                    </li>
                  )
                })
              }
            </ul>
          </ScrollContainer>
        </Paper>
      </div>
    </div>
  );

}