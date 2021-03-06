import React from 'react';
import { ListItem } from '@material-ui/core';
import { ButtonBase } from '@material-ui/core';

export function CustomListItem(props){
  return (
    <ButtonBase
      href={props.href}
      onClick={props.onClick}
      style={{
        width: "100%"
      }}
    >
      <ListItem 
        style={{
          paddingLeft: props.padding? props.padding : 12,
          paddingRight: 12,
        }}
        className={props.className}
      >  
        {props.children}
      </ListItem> 
    </ButtonBase>
  )
}