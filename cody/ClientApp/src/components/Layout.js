import React, { Component } from 'react';
import { NavMenu } from './nav_menu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu/>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
