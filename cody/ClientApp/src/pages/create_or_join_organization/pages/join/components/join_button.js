import React from 'react';

import { LoadingButton } from 'src/components/buttons/loading_button';
import { LoadingIconButton } from 'src/components/buttons/loading_icon_button';

import AddRoundedIcon from '@material-ui/icons/AddRounded';

export function JoinButton(props){
  const loading = props.loading;
  const disabled = props.disabled;
  const onJoin = props.onJoin;

  if(props.mobileView)
    return(
      <LoadingIconButton
        loading={loading}  
        color="secondary"
        disabled={disabled}
        onClick={onJoin}
        icon={<AddRoundedIcon/>}
      />
    )
  else
    return (
      <LoadingButton
        loading={loading}
        variant="outlined"
        color="secondary"
        disabled={disabled}
        onClick={onJoin}
        label="Unisciti"
        endIcon={<AddRoundedIcon/>}
      />     
    )
}