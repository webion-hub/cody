import React from 'react';

import { Hidden } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

import { TouchableTooltip } from 'src/components/touchable_tooltip';

const getSectionMainContent = (element) => {
  return <div>
    {
      element.element? (
        element.element
      ):(
        <IconButton
          href={element.href}
          style={{
            padding: element.padding
          }}
        >
          {element.icon? element.icon : null}
          {element.avatar? element.avatar : null}
        </IconButton>    
      )
    }  
  </div>
}

export const getSection = (section) => {
  if(section === null)
    return null;
    
  return section.map((element, index) => (
    <Hidden //Pc
      key={index}
      xsDown={!element.showAlways}
      implementation="css"
    >
      {
        element.tooltip ? 
          <TouchableTooltip
            title={element.label?element.label : ""}
            placement="bottom"
            arrow
          >
            {getSectionMainContent(element)}               
          </TouchableTooltip>
          :
          getSectionMainContent(element)                     
      }
    </Hidden>
  ))
}