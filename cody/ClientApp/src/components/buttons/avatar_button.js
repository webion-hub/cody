import React from "react";
import { ButtonBase, Tooltip } from "@material-ui/core";
import { CustomAvatar } from "src/components/custom_avatar";

export function AvatarButton(props){
  const {
    onClick,
    buttonClassName,
    children,
    placement,
    ...otherProps
  } = props

  return (
    <Tooltip
      arrow
      placement={placement}
      title={props.alt}
    >
      <ButtonBase
        onClick={onClick}
        className={buttonClassName}
      >
        <CustomAvatar
          disableLoadingRing
          {...otherProps}
        >
          {children}
        </CustomAvatar>
      </ButtonBase>
    </Tooltip>
  )
}

AvatarButton.defaultProps = {
  placement: "bottom"
}