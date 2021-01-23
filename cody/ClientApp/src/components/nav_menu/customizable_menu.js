import React from 'react';
import { Fade } from '@material-ui/core';

import { SideBar } from './bars/sidebar/sidebar'
import { sideBarSections } from './sections/sidebar_sections'
import { appBarSections } from './sections/appbar_sections'

export const CustomizableMenuContext = React.createContext({
  setCustomAppBarSection: {    
    appBar: {
      left: null,
      center: null,
      right: null,
    },
    sideBar: null,
  },
  setHideAppBar: () => {},
  setFadeAppBarSection: {
    left: true,
    center: true,
    right: true,
  },
  setFadeAppBar: () => {}
});

export function CustomizableMenu(props){
  const [customMenuSection, setCustomMenuSection] = React.useState({
    appBar: {
      left: null,
      center: null,
      right: null,
    },
    sideBar: null,
  });

  const [fadeAppBarSection, setFadeAppBarSection] = React.useState({
    left: true,
    center: true,
    right: true,
  });

  const value = { 
    customMenuSection,
    setCustomMenuSection,

    fadeAppBarSection,
    setFadeAppBarSection
  };
  
  const leftAppbar = customMenuSection.appBar.left ? customMenuSection.appBar.left : appBarSections.left;
  const centerAppbar = customMenuSection.appBar.center ? customMenuSection.appBar.center : appBarSections.center;
  const rightAppbar = customMenuSection.appBar.right ? customMenuSection.appBar.right : appBarSections.right;

  const sideBar = customMenuSection.sideBar ? customMenuSection.sideBar : sideBarSections;

  return (
    <CustomizableMenuContext.Provider value={value}>
      <SideBar
        sideBarSections={sideBar} 
        appBarPosition="fixed"
        appBarSections={{
          left: leftAppbar,          
          center: centerAppbar, 
          right: rightAppbar, 
        }}
        fadeSections={fadeAppBarSection}
      >
        {props.children}
      </SideBar>
    </CustomizableMenuContext.Provider>
  );
}
