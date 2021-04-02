import React from 'react';

import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { MenuItemBase } from './menu_item_base';
import { DialogBase } from 'src/components/bases/dialog_base';

export const DeleteForeverMenuItem = React.forwardRef((props, ref) => {
  const [openDialog, setOpenDialog] = React.useState(false)

  if(props.hide)
    return null;

	return (
    <>
      <MenuItemBase
        ref={ref}
        color="error"
        onClick={_ => setOpenDialog(true)}
        disabled={props.disabled}
        icon={HighlightOffRoundedIcon}
        label="Elimina per sempre"
      />
      <DialogBase
        open={openDialog}
        onClose={_ => setOpenDialog(false)}
        title="Sei sicuro di elinarlo per sempre?"
      >
      </DialogBase>
    </>
	);
})