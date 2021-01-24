import React from 'react';
import { DynamicSearchBar } from './home_components/dynamic_searchbar';

import { Images } from '../../lib/default_values/images';
import { MainTextBox } from './home_components/main_text_box';

import { makeStyles } from '@material-ui/core/styles';

export const fullDrawerWidth = 240;
export const restrictedWidth = 48;

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
      <div className={classes.background}/>    
    </div>
  );
}