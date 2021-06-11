import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import { Tooltip } from "@material-ui/core";
import { AvatarWithTooltip } from '../../avatar_with_tooltip';
import { UserListDialog } from 'src/components/dialogs/user_list_dialog';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  extraAvatar: {
    background: theme.palette.secondary.main,
    color: theme.palette.text.secondary
  }
}));

export function IconWithUserList(props){
  const classes = useStyles();
  const theme = useTheme()
  const [openDialog, setOpenDialog] = React.useState(false)

  const {
    size,
    numberOfAvatar,
    TooltipProps,
    className,
    onClick,
    callerIs,
    handler,
  } = props

  return (
    <>
      <AvatarWithTooltip
        AvatarProps={{
          size: size,
          disableLoading: true,
          className: classes.extraAvatar
        }}
        ButtonProps={{
          className: className,
          style: {zIndex: numberOfAvatar + 1}
        }}
        TooltipProps={TooltipProps}
        TooltipComponent={Tooltip}
        title="Mostra tutti gli utenti."
        onClick={e => {
          e.stopPropagation()
          onClick()
          setOpenDialog(true)
        }}
      >
        <MenuOpenRoundedIcon style={{color: theme.palette.secondary.contrastText}}/>
      </AvatarWithTooltip>
      <UserListDialog
        open={openDialog}
        onClose={_ => setOpenDialog(false)}
        callerIs={callerIs}
        handler={handler}
      />
    </>
  )
}