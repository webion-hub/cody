import React from 'react';
import { Divider } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { ButtonBase } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';

import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';

export function GetDrawerList(props){
  
  function createListItems(sections){
    return sections.map((elements, index) => (
      <div key={index}>
        <List>
          {elements.map((element, index) => (
            <div key={element.label + index}>
              {
                element.showAlways ? null : (
                  <CustomListItem                   
                    padding={element.padding}
                    href={element.href}
                    className={props.classes.listItem}
                    onClick={element.onClick}
                  >    
                    {
                      element.avatar? 
                        <ListItemAvatar 
                          style={{minWidth: 56 + element.padding}}
                        >
                          {element.avatar}
                        </ListItemAvatar> 
                      : 
                        null
                    }
                    {
                      element.icon? 
                        <ListItemIcon>
                          {element.icon}
                        </ListItemIcon> 
                      : 
                        null
                    }
                    <ListItemText 
                      primary={element.label} 
                      className={props.classes.listText}
                    />
                  </CustomListItem>
                )
              }
            </div>
          ))}
        </List>
      </div>
    ))
  }

  return (
    <div>
      <div 
        className={props.fullWidth ? props.classes.fullDrawerList : props.classes.restrictedDrawerList}
      >
        <Hidden xsDown implementation="css">
          <IconButton onClick={props.handleFullWidth}>
            {props.fullWidth ? (<ChevronLeftRoundedIcon/>):(<ChevronRightRoundedIcon/>)}          
          </IconButton>
        </Hidden>
      </div>
      {createListItems(props.sections)}
      <Hidden //Smartphone
        smUp 
        implementation="css"
      >
        {createListItems(props.appBarSections)}
      </Hidden>      
    </div>
  );
}







function CustomListItem(props){
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
          paddingLeft: props.padding 
        }}
        className={props.className}
      >  
        {props.children}
      </ListItem> 
    </ButtonBase>
  )
}