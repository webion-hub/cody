import React, { useEffect } from 'react';

import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { MenuItemBase } from './menu_item_base';
import { DialogBase } from 'src/components/bases/dialog_base';
import { TextField, Button, Typography } from '@material-ui/core';
import { LoadingButton } from 'src/components/buttons/loading_button';

export const DeleteForeverMenuItem = React.forwardRef((props, ref) => {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [textFieldName, setTextFieldName] = React.useState("")
  const [error, setError] = React.useState(false)

  const {
    hide,
    setLoading,
    loading,
    disabled,
    username,
    onDeleteForever,
    handler,
    onMenuClose
  } = props

  useEffect(() => {
    if(!loading)
      setOpenDialog(false);
  }, [loading])

  const handleDeleteForever = () => {
    if(textFieldName !== username){
      setError(true)
      return;
    }

    setLoading(true)
    handler
      .deleteUserForever()
      .finally(_ => {
        setLoading(false)
        onDeleteForever?.()
      })
  }

  const handleDialogOpen = () => {
    onMenuClose?.()
    setOpenDialog(true)
  }

	return (
    <>
      <MenuItemBase
        hide={hide}
        ref={ref}
        color="error"
        onClick={handleDialogOpen}
        disabled={disabled}
        icon={HighlightOffRoundedIcon}
        label="Elimina per sempre"
      />
      <DialogBase
        open={openDialog}
        onClose={_ => setOpenDialog(false)}
        title="Elimina per sempre"
        firstButton={
          <Button
            color="secondary"
            onClick={_ => setOpenDialog(false)}
          >
            Chiudi
          </Button>
        }
        secondButton={
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handleDeleteForever}
            label="Elimina"
            loading={loading}
          />
        }
      >
        <Typography
          variant="body2"
          color="textSecondary"
        >
          Scrivi <b>{username}</b> per eliminare
        </Typography>
        <br/>
        <TextField
          error={error}
          label="Username"
          variant="outlined"
          color="secondary"
          onChange={e => e.preventDefault()}
          fullWidth
        />
      </DialogBase>
    </>
	);
})