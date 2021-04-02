import React from 'react';

import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { MenuItemBase } from './menu_item_base';
import { DialogBase } from 'src/components/bases/dialog_base';
import { TextField, Button } from '@material-ui/core';

export const DeleteForeverMenuItem = React.forwardRef((props, ref) => {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [textFieldName, setTextFieldName] = React.useState("")
  const [error, setError] = React.useState(false)

  const handleDeleteForever = () => {
    if(textFieldName !== props.username){
      setError(true)
      return;
    }

    props.onDeleteForever()
    setOpenDialog(false)
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteForever}
          >
            Elimina
          </Button>
        }
      >
        <TextField
          error={error}
          label="Username"
          variant="outlined"
          color="secondary"
          onChange={e => setTextFieldName(e.target.value)}
        />
      </DialogBase>
    </>
	);
})