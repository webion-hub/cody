import React from 'react';

import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { MenuItemBase } from 'src/components/menu/menu_items/menu_item_base';

export const DeleteMenuItem = React.forwardRef((props, ref) => {
  const {
    hide,
    setLoading,
    disabled,
    onDelete,
    handler,
  } = props

  const handleDelete = () => {
    setLoading(true)
    handler
      .delete()
      .finally(_ => {
        setLoading(false)
        onDelete?.()
      });
  }
	return (
    <MenuItemBase
      hide={hide}
      ref={ref}
      onClick={handleDelete}
      disabled={disabled}
      icon={DeleteRoundedIcon}
      label="Cancella"
    />
	);
})