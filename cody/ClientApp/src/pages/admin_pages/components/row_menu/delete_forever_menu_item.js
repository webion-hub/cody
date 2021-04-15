import React, { useEffect } from 'react';

import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { MenuItemBase } from '../../../../components/menu/menu_items/menu_item_base';
import { DialogBase } from 'src/components/bases/dialog_base';
import { TextField, Button, Typography } from '@material-ui/core';
import { LoadingButton } from 'src/components/buttons/loading_button';

export const DeleteForeverMenuItem = React.forwardRef((props, ref) => {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [textFieldName, setTextFieldName] = React.useState("")
  const [error, setError] = React.useState(false)

  useEffect(() => {
    if(!props.loading)
      setOpenDialog(false);
  }, [props.loading])

  const handleDeleteForever = () => {
    if(textFieldName !== props.username){
      setError(true)
      return;
    }

    props.onDeleteForever()
  }

  const handleDialogOpen = () => {
    props.onMenuClose?.()
    setOpenDialog(true)
  }

  if(props.hide)
    return null;

	return (
    <>
      <MenuItemBase
        ref={ref}
        color="error"
        onClick={handleDialogOpen}
        disabled={props.disabled}
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
            loading={props.loading}
          />
        }
      >
        <Typography
          variant="body2"
          color="textSecondary"
        >
          Scrivi <b>{props.username}</b> per eliminare
        </Typography>
        <br/>
        <TextField
          error={error}
          label="Username"
          variant="outlined"
          color="secondary"
          onChange={e => setTextFieldName(e.target.value)}
          fullWidth
        />
      </DialogBase>
    </>
	);
})