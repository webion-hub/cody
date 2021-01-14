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

import { restrictedWidth } from './sidebar_styles';

import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';

export function getDrawer(classes, handleFullWidth, sections, fullWidth){
  return (
    <div>
      <div 
        className={fullWidth ? classes.fullToolbar : classes.restrictedToolbar}
      >
        <Hidden xsDown implementation="css">
          <IconButton onClick={handleFullWidth}>
            {fullWidth ? (<ChevronLeftRoundedIcon/>):(<ChevronRightRoundedIcon/>)}          
          </IconButton>
        </Hidden>
      </div>
      {
        sections.map((elements, index) => (
          <div key={index}>
            <Divider />
            <List>
              {elements.map((element, index) => (
                <CustomListItem                   
                  key={element.label + index}
                  padding={element.avatarPadding}
                  href={element.href}
                >    
                  {
                    element.avatar? 
                      <ListItemAvatar 
                        style={{minWidth: restrictedWidth + element.avatarPadding}}
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
                    className={classes.listText}
                  />
                </CustomListItem>
              ))}
            </List>
          </div>
        ))
      }
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
      >  
        {props.children}
      </ListItem> 
    </ButtonBase>
  )
}