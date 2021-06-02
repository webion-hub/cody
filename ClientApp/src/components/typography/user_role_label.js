import { Typography } from "@material-ui/core";
import React from "react";
import { UserRoleIcon } from "../icons/user_role_icon";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex"
  },
  roleIcon: props => ({
    marginRight: theme.spacing(0.5),
    transform: `translate(0px, ${props.yTranslate}px)`
  }),
}));

export function UserRoleLabel({role, yTranslate, ...other}){
	const classes = useStyles({yTranslate});
  
  if(!role)
    return null

  const getLabel = () => {
    const labels = {
      Owner: "Propietario",
      Admin: "Admin",
      User: "Utente",
    }

    return labels[role]
  }

  return (
    <div className={classes.container}>
      <UserRoleIcon role={role} className={classes.roleIcon}/>
      <Typography {...other}>
        {getLabel()}
      </Typography>
    </div>    
  )
}

UserRoleLabel.defaultProps = {
  yTranslate: 1
}