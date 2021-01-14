import React, { Component } from 'react';
import { SideBar } from './bars/sidebar/sidebar'
import Typography from '@material-ui/core/Typography';

import { sections } from './bars/sidebar/sections'

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  
  render () {
    return (
      <SideBar
        sections={sections} 
        appbarPosition="fixed"
        appBar={            
          <Typography 
            variant="h6" 
            noWrap
          >
            Cody
          </Typography> 
        }
      >
        {this.props.children}
      </SideBar>
    );
  }
}
