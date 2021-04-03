import React from 'react';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { MenuItemBase } from './menu_item_base';
import { DialogBase } from 'src/components/bases/dialog_base';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'

import { Admin } from 'src/lib/server_calls/admin';

export const EditRoleMenuItem = React.forwardRef((props, ref) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [textFieldRole, setTextFieldRole] = React.useState("");

  const handleEditRole = (data) => {
    if(textFieldRole == "")
      return;

    const info = { 
      id : props.id,
      role : textFieldRole,
    }

    props.onEditRole(info);
    setOpenDialog(false);
  }

  const handleDialogOpen = () => {
    props.onMenuClose?.();
    setOpenDialog(true);
  }

  if(props.hide)
    return null;

  return (
    <>
      <MenuItemBase
        ref={ref}
        onClick={handleDialogOpen}
        disabled={props.disabled}
        icon={EditRoundedIcon}
        label="Modifica ruolo"
      />
      <DialogBase
        open={openDialog}
        onClose={_ => setOpenDialog(false)}
        title="Modifica ruolo"
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
            onClick={handleEditRole}
          >
            Salva
          </Button>
        }
      >
        <Autocomplete
          options={["Admin", "User"]}
          style={{ minWidth: "200px" }}
          onChange={(event, value) => setTextFieldRole(value)}
          renderInput={params => (
            <TextField
              {...params}
              label="Ruolo"
              variant="outlined"
              color="secondary"
              content={Admin.getUserRole(props.id)}
              onChange={e => setTextFieldRole(e.target.value)}
            />
          )}
        />
      </DialogBase>
    </>
  );
})