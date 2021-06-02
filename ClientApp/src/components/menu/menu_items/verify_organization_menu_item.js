import React from 'react';

import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import { MenuItemBase } from 'src/components/bases/items/menu_item_base';

export const VerifyOrganizationMenuItem = React.forwardRef((props, ref) => {
  const {
    id,
    hide,
    setLoading,
    disabled,
    onVerify,
    handler
  } = props

  const handleVerify = () => {
    setLoading(true)
    handler
      .verify(id)
      .finally(_ => {
        setLoading(false)
        onVerify?.()
      });
  }

	return (
    <MenuItemBase
      hide={hide}
      ref={ref}
      onClick={handleVerify}
      disabled={disabled}
      icon={BeenhereRoundedIcon}
      label="Verifica"
    />
	);
})