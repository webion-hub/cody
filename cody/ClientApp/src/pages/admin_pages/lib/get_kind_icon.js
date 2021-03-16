import React from 'react';

import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';

export const getKindIcon = (kind) => {
  switch(kind){
    case "Team":
      return <GroupRoundedIcon fontSize="small"/>
    case "School":
      return <SchoolRoundedIcon fontSize="small"/>
    case "Company":
      return <BusinessCenterRoundedIcon fontSize="small"/>
  }
}