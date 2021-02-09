import React from 'react';
import { useSpring } from 'react-spring'

import { MainTextBox } from './home_components/main_text_box';
import { DynamicSearchBar } from './home_components/dynamic_searchbar';
import { MyClasses } from './home_components/my_classes';
import { Cpp } from 'src/components/icons/cpp';
import { AnimatedCoding } from 'src/components/illustrations/animated_coding/animated_coding';
import { BackgroundWithLines } from 'src/components/background_with_lines';

import { makeStyles } from '@material-ui/core/styles';

const homeStyles = makeStyles((theme) => ({
  background: {
    marginTop: theme.spacing(2),
    margin: "0 auto",
    width: "38%",
    maxWidth: 700,
    [theme.breakpoints.down('md')]: {
      width: "50%",
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(6),
      width: "70%",
    },
    [theme.breakpoints.down('xs')]: {
      width: "90%",
    },
  },
  myClasses: {
    paddingTop: 25,
    background: theme.appBar.color,
  }
}));

export function Home(){
  const classes = homeStyles();
  const [springProps, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]

  return(
    <div
      style={{
        minHeight: "200vh"
      }}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <MainTextBox/>
      <DynamicSearchBar/>
      <AnimatedCoding className={classes.background} springProps={springProps}/>
      <MyClasses
       className={classes.myClasses}
       classesList={[
         {
            image: "images/bulb.jpeg",
            title: "Classe 1",
            icon: (<Cpp/>),
            admin: {
              username: "Matteo2437aaaaaaaaaaaaaaaaaaa",
              profilePic: "images/forest.jpg"
            },
            users: [
              {
                username: "cala_br",
                profilePic: "/images/bulb.jpeg"
              },
              {
                username: "aaaaa",
                profilePic: "/images/waves.svg"
              }
            ]
         },
         {
            image: "images/bulb.jpeg",
            title: "Classe 1",
            icon: (<Cpp/>),
            admin: {
              username: "Matteo2437",
              profilePic: "images/forest.jpg"
            },
            users: []
          },
          {
             image: "images/bulb.jpeg",
             title: "Classe 1",
             icon: (<Cpp/>),
             admin: {
               username: "Matteo2437",
               profilePic: "images/forest.jpg"
             },
             users: []
           },
           {
            image: "images/bulb.jpeg",
            title: "Classe 1",
            icon: (<Cpp/>),
            admin: {
              username: "Matteo2437",
              profilePic: "images/forest.jpg"
            },
            users: []
          }
       ]}
      />
      <BackgroundWithLines/>
    </div>
  );
}
