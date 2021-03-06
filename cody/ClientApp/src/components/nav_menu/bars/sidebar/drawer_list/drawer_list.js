import React from 'react';
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { createListItem } from './create_list_item';


export const useStyles = makeStyles((theme) => ({
  listText: {
    whiteSpace: "nowrap",
  },
  listItem: {
    paddingLeft: "12px",
    paddingRight: "12px",
  }
}));

export function DrawerList(props){
  const classes = useStyles();

  const pcList = createListItem({
    elements: props.sections,
    onSidebarClose: props.onSidebarClose,
    classes: classes
  })

  const mobileList = createListItem({
    elements: props.appBarSections,
    onSidebarClose: props.onSidebarClose,
    classes: classes
  })

  return (
    <div>      
      {pcList}
      <Hidden //Smartphone
        smUp 
        implementation="css"
      >
        {mobileList}
      </Hidden>      
    </div>
  );
}

