import React from 'react';
import { Divider, Hidden } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { ButtonBase } from '@material-ui/core';
import { PageController } from 'src/lib/page_controller';

export function GetDrawerList(props){
  
  const createListItems = (elements) => {
    if(elements === null)
      return null;
      
    return <List>
      {elements.map((element, index) => (
        <div key={index}>
          {
            element.divider ? 
              <Divider/> : null
          }
          {
            element.showAlways ? 
              null
              :
              <CustomListItem             
                padding={element.padding}
                href={element.href}
                className={props.classes.listItem}
                onClick={(e) => {
                  PageController.push(element.href, e)
                  props.onSidebarClose()
                }}
              > 
                {
                  element.icon? 
                    <ListItemIcon>
                      {element.icon}
                    </ListItemIcon> 
                  : 
                    null
                }
                <ListItemText           
                  style={{paddingLeft: element.padding? element.padding*2 : "auto"}}
                  primary={element.label} 
                  className={props.classes.listText}
                />
              </CustomListItem>                
          }
        </div>
      ))}
    </List>
  }

  return (
    <div>      
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