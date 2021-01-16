import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';

import { SideBar } from './bars/sidebar/sidebar'
import { sideBarSections } from './sections/sidebar_sections'
import { appBarSections } from './sections/appbar_sections'


export class NavMenu extends Component {
  static displayName = NavMenu.name;
  
  render () {
    return (
      <SideBar
        sideBarSections={sideBarSections} 
        appBarPosition="fixed"
        appBarSections={appBarSections}
      >
        {this.props.children}
      </SideBar>
    );
  }
}
