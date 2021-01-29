import React from 'react';

import { Images } from '../../lib/default_values/images';
import { MainTextBox } from './home_components/main_text_box';
import { DynamicSearchBar } from './home_components/dynamic_searchbar';
import { MyClasses } from './home_components/my_classes';
import { Cpp } from '../../components/icons/cpp';

import { makeStyles } from '@material-ui/core/styles';

const homeStyles = makeStyles((theme) => ({
  background: {
    position: "absolute",
    left: 0,   
    top: 0,
    height: "100%",
    minWidth: "100%",
    backgroundImage: `url(${Images.wavesImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    backgroundSize: "cover",
    zIndex: "-1",
    [theme.breakpoints.up('sm')]: {
      maxHeight: "80vh",
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: "60vh",
    },
  },
  myClasses: {
    marginTop: 80
  }
}));

export function Home(){
  const classes = homeStyles();

  return(
    <div
      style={{
        minHeight: "200vh"
      }}
    >
      <MainTextBox/>
      <DynamicSearchBar/>
      <MyClasses
       className={classes.myClasses}
       classesList={[
         {
            image: "images/bulb.jpeg",
            title: "Classe 1",
            icon: (<Cpp/>),
            admin: {
              username: "Matteo2437",
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
      <div className={classes.background}/>    
    </div>
  );
}
