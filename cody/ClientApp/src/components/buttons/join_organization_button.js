import React from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { LoadingButton } from 'src/components/buttons/loading_button';
import { LoadingIconButton } from 'src/components/buttons/loading_icon_button';
import { User } from 'src/lib/server_calls/user';

export function JoinOrganizationButton(props){
  const [loading, setLoading] = React.useState(false);
  const updateUserOrganizations = new Event('updateUserOrganizations');

  const {
    organization,
    onJoin,
    mobileView,
  } = props

  const handleJoin = () => {
    setLoading(true)
    User
      .join(organization?.id)
      .finally(() => {
        setLoading(false)
        document.dispatchEvent(updateUserOrganizations)
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