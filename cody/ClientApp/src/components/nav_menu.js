import React, { Component } from 'react';
import { SideBar } from './bars/sidebar/sidebar'
import { AppBar } from './bars/appbar/appbar'


import { sections } from './bars/sidebar/sections'

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  
  render () {
    return (
      <SideBar
        sections={sections} 
        appbarPosition="fixed"
        appBar={            
          <AppBar></AppBar>
        }
      >
        {this.props.children}
      </SideBar>
    );
  }
}
