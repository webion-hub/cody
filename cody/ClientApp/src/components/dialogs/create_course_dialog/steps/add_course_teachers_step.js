import React, { useEffect } from "react";
import Typography from '@material-ui/core/Typography';

import { OrganizationContext } from "src/pages/organization/organization_controller_context";
import { CustomScrollContainer } from "src/components/overflows/custom_scroll_container/custom_scroll_container";
import { EventsDispatcher } from "src/lib/events_dispatcher";
import { useListener } from "src/lib/hooks/use_listener";
import { AvatarWithOverlayAndLabel } from "src/components/avatars/avatar_with_overlay_and_label";
import { UserListItemWithCheckBox } from "src/components/lists/list_items/user_list_items/user_list_item_with_checkbox";
import { ListWithActiveIds } from "src/components/lists/list_with_active_ids";
import { makeStyles } from '@material-ui/core/styles';
import { Fade, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(2),
  },
  avatars: {
    height: 83,
  },
  avatarAnimation: {
    animation: `$animate 0.06s linear`,
  },
  "@keyframes animate": {
    "0%": {
      opacity: 0,
      transform: "scale(0)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1)"
    }
  }
}));

export default function AddCourseTeachersStep(props){
	const classes = useStyles();
  const [users, setUsers] = React.useState(props.teachers ?? []);
  const {
    organization
	} = React.useContext(OrganizationContext);

  const controller = EventsDispatcher.setEvent('newTeacher')
  const {
    addActiveId,
    removeActiveId,
    ListWithActiveIdsComponent
  } = ListWithActiveIds()

  const isNotNewUser = (newUser) => (user) => {
    return newUser.id === user.id;
  }

  const handleNewUser = (user) => {
    const hasUserBeenDeleted = deleteUser(user)
    if(hasUserBeenDeleted) return;

    addUser(user)
  }

  const addUser = (user) => {
    setUsers(users => users.concat(user))
    addActiveId(user[0].id)
  }

  const deleteUser = (userArg) => {
    const user = userArg[0]
    const userIndex = users.findIndex(isNotNewUser(user))

    if(userIndex === -1)
      return false;
    
    const newUsers = [...users];
    newUsers.splice(userIndex, 1);
    setUsers(newUsers)
    removeActiveId(user.id)

    return true;
  }

  useListener({
    controller: controller,
    eventFunction: handleNewUser,
    removeFirstExecution: true
  })

  useEffect(() => {
    props?.onTeachersChange(users)
  }, [users])

  return (
    <Grid
      className={classes.container}
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Typography>
        Seleziona i Professori
      </Typography>
      <Typography
        color="textSecondary"
        variant="caption"
      >
        per questo corso
      </Typography>
      <Fade in={props.errors.teachersError}>
        <Typography
          variant="caption"
          color="error"
        >
          Nessun professore aggiunto!
        </Typography>
      </Fade>
      
      <CustomScrollContainer className={classes.avatars}>
        {
          users.map((user, index) => (
            <AvatarWithOverlayAndLabel
              className={classes.avatarAnimation}
              key={index}
              user={user}
              onDelete={deleteUser}
            />
          ))
        } 
      </CustomScrollContainer>
      <ListWithActiveIdsComponent
        listHeight={328}
        listMobileHeight={window.innerHeight / 2}
        width="100%"
        elementForStep={25}
        itemSize={56}
        getList={organization.getMembers}
        listItem={UserListItemWithCheckBox}
        listItemProps={{
          onClick: controller.update,
        }}
        noDataFoundProps={{
          hide: true,
        }}
      />
    </Grid>  
  )
}