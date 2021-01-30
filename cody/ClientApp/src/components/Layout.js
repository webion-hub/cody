import React, { Component } from 'react';
import { CustomizableMenu } from 'src/components/nav_menu/customizable_menu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <CustomizableMenu>
          {this.props.children}
        </CustomizableMenu>
      </div>
    );
  }
}
