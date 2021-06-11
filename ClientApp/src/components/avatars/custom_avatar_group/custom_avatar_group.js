import React from "react";
import { AvatarsForGroup } from "./components/avatars_for_group";
import { IconWithUserList } from "./components/icon_with_user_list";
import { useAvatarGroupStyles } from "./styles/use_avatar_group_styles";

export function CustomAvatarGroup(props){
	const classes = useAvatarGroupStyles(props);
	const [open, setOpen] = React.useState("close");

  const { 
    users,
    direction,
    size,
    className,
    loading,
    handler,
    callerIs,
    maxAvatars
  } = props

  const numberOfAvatar = users ? users.length : 0
  const noExtraAvatar = numberOfAvatar <= maxAvatars

  const isHorizontal = direction === "horizontal"
  const TooltipProps = {placement: isHorizontal ? "bottom" : "left"}

  const groupClassName = isHorizontal 
    ? classes.avatarGroupHorizontal
    : classes.avatarGroupVertical

  const spacingClassName = isHorizontal 
    ? classes.avatarSpacingHorizontal
    : classes.avatarSpacingVertical


  const handleForceClose = () => setOpen("close")
  const handleOpen = () => {
    if(open === "keepOpen")
      return;

      setOpen("open")
  }
  const handleClose = () => {
    if(open === "keepOpen")
      return;

    handleForceClose()
  }

  const getClassStatus = () => {
    const isOpen = open !== "close"

    const className = isHorizontal
      ? classes.avatarGroupOpenHorizontal
      : classes.avatarGroupOpenVertical

    return isOpen ? className : ""
  }

  return (
    <div
      className={`${groupClassName} ${className ? className : ""}`}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onTouchStart={handleOpen}
      onTouchMove={handleClose}
    >
      {
        !loading &&
          <>
            {
              !noExtraAvatar &&
                <IconWithUserList
                  size={size}
                  numberOfAvatar={numberOfAvatar}
                  TooltipProps={TooltipProps}
                  className={`${classes.avatar} ${getClassStatus()}`}
                  handler={handler}
                  callerIs={callerIs}
                  onClick={handleForceClose}
                />
            }
            <AvatarsForGroup
              size={size}
              numberOfAvatar={numberOfAvatar}
              TooltipProps={TooltipProps}
              users={users}
              handler={handler}
              callerIs={callerIs}
              maxAvatars={maxAvatars}
              className={`${classes.avatar} ${spacingClassName} ${getClassStatus()}`}
              noExtraAvatar={noExtraAvatar}
            />
          </>     
      }
    </div>
  )
}

CustomAvatarGroup.defaultProps = {
  direction: "horizontal",
  spacing: 12,
  borderWidth: 4,
  size: 40,
}