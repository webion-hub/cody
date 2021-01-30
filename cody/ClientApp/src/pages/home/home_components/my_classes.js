import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ClassCard } from 'src/components/cards/class_card';
import { School } from 'src/components/illustrations/school';

import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

const classesStyles = makeStyles((theme) => ({
  classesListStyle: {
    display: "flex",
    padding: 0,
    marginTop: 20,
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      marginTop: "5vw",
      marginBottom: "5vw",
    },
  },
  class: {
    display: "inline-block",
    paddingLeft: 20,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "5vw",
    },
  },
  rightPadding: {
    paddingRight: 20,
    [theme.breakpoints.down('xs')]: {
      paddingRight: "5vw",
    },
  },
  classesBox: {
    maxWidth: 1500,
    [theme.breakpoints.down('lg')]: {
      maxWidth: 1130,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 760,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 390,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: "100vw",
    },
    margin: "0 auto",
  },
  emptyBox: {
    maxWidth: 900,
    margin: "0 auto",
  },
  emptyContent: {
    textAlign: "center",
    fontWeight: 500
  },
  showClassButton: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
    },
    display: "flex",
    margin:"0 auto"
  }
}));


export function MyClasses(props){
  const classes = classesStyles();
  const theme = useTheme();
  const classesList = props.classesList;
  const classesNumber = classesList.length; 
  const mobileWidth = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={props.className}>
      <div className={classesNumber === 0 ? classes.emptyBox : classes.classesBox}>
        {
          classesNumber === 0 ? (
            null
          ):(
            <Typography variant="h4">
              <SchoolRoundedIcon style={{marginRight: 15, height: 30, width: 30}}/>
                Le classi a cui sei iscritto
            </Typography>
          )
        }
        <Paper>
          {
            classesNumber === 0 ? (
              <Grid
                container
                direction="row"
                alignItems="center"
              >
                <Grid 
                  item
                  xs={12}
                  sm={5}
                >
                  <School 
                    maxWidth={400}
                    margin="0 auto"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={7}
                >
                  <Typography
                    variant={ mobileWidth ? "h5" : "h4"}
                    className={classes.emptyContent}
                  >
                    Non sei iscritto<br/>a nessuna classe!
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.showClassButton}
                    endIcon={<KeyboardArrowRightRoundedIcon/>}
                  >
                    Mostra le classi
                  </Button>
                </Grid>
              </Grid>
            ):(
              <ScrollContainer
                hideScrollbars={false}
                ignoreElements=".scrollableChipsArray"
              >
                <ul className={classes.classesListStyle}>
                  {
                    classesList.map((data, index) => {
                      return (
                        <li 
                          key={index}
                          className={
                            `${classes.class} +
                            ${
                              index === classesNumber - 1 ?
                              classes.rightPadding :
                              null
                              }`
                          }
                        >
                          <ClassCard
                            loading={false}
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
            )
          }
        </Paper>
      </div>
    </div>
  );

}