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
        <Divider />
        <List>
          {elements.map((element, index) => (
            <CustomListItem                   
              key={element.label + index}
              padding={element.avatarPadding}
              href={element.href}
              className={props.classes.listItem}
            >    
              {
                element.avatar? 
                  <ListItemAvatar 
                    style={{minWidth: 56 + element.avatarPadding}}
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