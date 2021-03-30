import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';

export const OrganizationKindIcon = ({kind, size}) => {
  const iconSize = size ? size : "inherit";
  const lowerKind = kind.toLowerCase()

  switch(lowerKind){
    case "school":        
      return <SchoolRoundedIcon size={iconSize}/>;
    case "team":        
      return <GroupRoundedIcon size={iconSize}/>;
    case "company":        
      return <BusinessCenterRoundedIcon size={iconSize}/>;
    default:
      return null;
  }
}