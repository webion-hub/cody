import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';

export const OrganizationKindIcon = ({kind, size, color}) => {
  const iconSize = size ? size : "inherit";
  const lowerKind = kind?.toLowerCase()

  const kindIcon = {
    "school": SchoolRoundedIcon,
    "team": GroupRoundedIcon,
    "company": BusinessCenterRoundedIcon
  }[lowerKind]

  const component = {icon: kindIcon} 

  if(!kindIcon)
    return null;

  return (
    <component.icon
      size={iconSize}
      style={{color: color}}
    />
  )
}