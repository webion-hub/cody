import React from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { LoadingButton } from 'src/components/buttons/loading_button';
import { LoadingIconButton } from 'src/components/icon_buttons/loading_icon_button';
import { User } from 'src/lib/server_calls/user';
import { EventsDispatcher } from 'src/lib/events_dispatcher';
import { UserContext } from '../global_contexts/user_controller_context/user_controller_context';

export function JoinOrganizationButton(props){
  const { userState } = React.useContext(UserContext)
  const [loading, setLoading] = React.useState(false);

  const {
    organization,
    onJoin,
    mobileView,
  } = props

  const handleJoin = () => {
    if(userState !== "logged"){
      EventsDispatcher
        .setEvent('openLoginDialog')
        .update()
      return;
    }

    setLoading(true)
    User
      .join(organization?.id)
      .finally(() => {
        EventsDispatcher
          .setEvent('updateOrganizationMember')
          .update()
          
        onJoin?.()
      })
  }

  const commonProps = {
    loading: loading,
    color: "secondary",
    disabled: organization?.state.hasBeenDeleted,
    onClick: handleJoin
  }

  if(mobileView)
    return(
      <LoadingIconButton
        {...commonProps}
        icon={<AddRoundedIcon/>}
      />
    )
    
  return (
    <LoadingButton
      {...commonProps}
      variant="outlined"
      label="Unisciti"
      endIcon={<AddRoundedIcon/>}
    />
  )

}