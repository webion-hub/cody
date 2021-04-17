import React from 'react';

import RestoreRoundedIcon from '@material-ui/icons/RestoreRounded';
import { MenuItemBase } from 'src/components/menu/menu_items/menu_item_base';

export const RestoreMenuItem = React.forwardRef((props, ref) => {
  const {
    hide,
    setLoading,
    disabled,
    onRestore,
    handler,
  } = props

  const handleRestore = () => {
    setLoading(true)
    handler
      .restore()
      .finally(_ => {
        setLoading(false)
        onRestore?.()
      });
  }

	return (
    <MenuItemBase
      hide={hide}
      ref={ref}
      onClick={handleRestore}
      disabled={disabled}
      icon={RestoreRoundedIcon}
      label="Ripristina"
    />
	);
})