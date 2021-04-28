import React, { useEffect } from 'react';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { MenuItemBase } from 'src/components/menu/menu_items/menu_item_base';
import { DialogBase } from 'src/components/bases/dialog_base';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import { LoadingButton } from 'src/components/buttons/loading_button';

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
  const [selectLoading, setSelectLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [textFieldRole, setTextFieldRole] = React.useState("");

  const classes = useStyles();

  const {
    hide,
    setLoading,
    loading,
    disabled,
    onEditRole,
    handler,
    onMenuClose
  } = props

  useEffect(() => {
    if(!loading && openDialog)
      setOpenDialog(false);
  }, [loading])

  const handleEditRole = () => {
    if(textFieldRole === "")
      return;

    setLoading(true)
    handler
      .setRole(textFieldRole)
      .finally(_ => {
        setLoading(false)
        onEditRole?.();
      });
  }

  const handleDialogOpen = () => {
    setOpenDialog(true);
    setSelectLoading(true);

    handler.getRole()
      .then(role => setTextFieldRole(role))
      .finally(() => setSelectLoading(false))

    onMenuClose?.();
  }

  return (
    <>
      <MenuItemBase
        hide={hide}
        ref={ref}
        onClick={handleDialogOpen}
        disabled={disabled}
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
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            onClick={handleEditRole}
            label="Salva"
          />
        }
      >
        <TextField
          className={classes.formControl}
          select
          label="Ruolo"
          disabled={selectLoading}
          onChange={e => setTextFieldRole(e.target.value)}
          variant="outlined"
          value={textFieldRole}
          color="secondary"
        >
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </TextField>
      </DialogBase>
    </>
  );
})