import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';

export function UserRoleIcon({role, className, fontSize}){

  const getIcon = () => {
    const icons = {
      Owner: StarsRoundedIcon,
      Admin: AccountCircleRoundedIcon,
      User: FaceRoundedIcon,
    }

    return icons[role]
  }

  const RoleIcon = getIcon()
  
  return (
    <RoleIcon className={className} fontSize={fontSize}/>   
  )
}

UserRoleIcon.defaultProps = {
  fontSize: "small"
}