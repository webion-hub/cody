import { ButtonBase } from "@material-ui/core";
import React from "react";
import { CustomAvatar } from "src/components/avatars/custom_avatar";

export const ButtonAvatar = React.forwardRef((props, ref) => {
  const {
    onClick,
    href,
    ButtonProps,
    AvatarProps,
    children,
  } = props

  return (
    <ButtonBase
      href={href}
      onClick={onClick}
      {...ButtonProps}
    >
      <CustomAvatar
        ref={ref}
        disableLoadingRing
        {...AvatarProps}
      >
        {children}
      </CustomAvatar>
    </ButtonBase>
  )
})