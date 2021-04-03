import React from 'react';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { MenuItemBase } from './menu_item_base';
import { DialogBase } from 'src/components/bases/dialog_base';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Admin } from 'src/lib/server_calls/admin';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const EditRoleMenuItem = React.forwardRef((props, ref) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [textFieldRole, setTextFieldRole] = React.useState("");

  const classes = useStyles();

  const handleEditRole = () => {
    if(textFieldRole === "")
      return;

    const info = { 
      id : props.id,
      role : textFieldRole,
    }

    props.onEditRole(info);
    setOpenDialog(false);
  }

  const handleDialogOpen = () => {
    Admin.getUserRole(props.id)
      .then(role => {
        setTextFieldRole(role);
        setOpenDialog(true);
      });

    props.onMenuClose?.();
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
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Ruolo</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={textFieldRole}
            color="secondary"
            onChange={e => setTextFieldRole(e.target.value)}
            label="Ruolo"
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogBase>
    </>
  );
})