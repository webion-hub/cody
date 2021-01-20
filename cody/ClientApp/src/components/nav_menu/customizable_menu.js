import React from 'react';

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
  setHideAppBar: () => {}
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
  const value = { customMenuSection, setCustomMenuSection };
  
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
      >
        {props.children}
      </SideBar>
    </CustomizableMenuContext.Provider>
  );
}
