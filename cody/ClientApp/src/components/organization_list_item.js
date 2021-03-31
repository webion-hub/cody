import React from 'react';
import { ListItem } from '@material-ui/core'

import { PageController } from 'src/lib/page_controller';

export function OrganizationListItem(props){
  const organizationId = props.organizationId;
  const organizationUrl = `/organization/${organizationId}`

  const openOrganization = (e) => {
    PageController.push(organizationUrl, e)
  }
   
  return(
    <ListItem 
      ContainerProps={{ style: props.style }}
      ContainerComponent="div" 
      key={props.index}
      className={props.className}
      button
      onClick={openOrganization}
      href={organizationUrl}
      component="a"
      disabled={props.disabled}
    >  
      {props.children}
    </ListItem>
  )
}