import React from 'react';
import { Divider } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';

import { PageController } from 'src/lib/page_controller';
import { CustomListItem } from './custom_list_item';
  
export const createListItem = ({elements, onSidebarClose, classes}) => {
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
              className={classes.listItem}
              onClick={(e) => {
                PageController.push(element.href, e)
                onSidebarClose()
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
                className={classes.listText}
              />
            </CustomListItem>                
        }
      </div>
    ))}
  </List>
}