import React, { useRef } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AvatarWithTooltip } from "../buttons/avatar_with_tooltip";
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import { Box, Tooltip, Typography } from "@material-ui/core";

const avatarGroupOpenHorizontal = {
  marginLeft: "8px !important",
  boxShadow: "none !important",
  pointerEvents: "auto !important",
}

const avatarGroupOpenVertical = {
  marginTop: "8px !important",
  boxShadow: "none !important",
  pointerEvents: "auto !important",
}

const useStyles = makeStyles((theme) => ({
  avatarGroupHorizontal: props => ({
    width: "fit-content",
    margin: props.borderWidth,
    display: "flex",
    "&:hover": {
      "& > *": avatarGroupOpenHorizontal
    }
  }),
  avatarGroupVertical: props => ({
    width: "min-content",      
    margin: props.borderWidth,
    display: "block",
    "&:hover": {
      "& > *": avatarGroupOpenVertical
    }
  }),

  avatarGroupOpenHorizontal: avatarGroupOpenHorizontal,
  avatarGroupOpenVertical: avatarGroupOpenVertical,

  avatarSpacingHorizontal: props => ({
    marginLeft: -props.spacing,
  }),
  avatarSpacingVertical: props => ({
    marginTop: -props.spacing,
  }),

  avatar: props => ({
    background: props.borderColor,
    boxShadow: `0 0 0 ${props.borderWidth}px ${props.borderColor}`,
    borderRadius: "50%",
    pointerEvents: "none",
    "&:hover": {
      transform: "scale(1.2)",
      boxShadow: "none",
    },
    transition: "0.25s all"
  }),
  finalAvatar: {
    background: theme.palette.secondary.main,
    color: theme.palette.text.secondary
  }
}));

export function CustomAvatarGroup(props){
	const classes = useStyles(props);
  const theme = useTheme()

  //I've used a ref because is the only way 
  //for passing the real status of "open" inside listeners
	const [open, setOpen] = React.useState("close");
  const openRef = useRef(open);

  const avatarsProps = props.avatarsProps
  const numberOfAvatar = avatarsProps ? avatarsProps.length : 0

  const isDirectionHorizontal = props.direction === "horizontal"

  const avatarGroupClassName = isDirectionHorizontal 
    ? classes.avatarGroupHorizontal
    : classes.avatarGroupVertical

  const avatarSpacingClassName = isDirectionHorizontal 
    ? classes.avatarSpacingHorizontal
    : classes.avatarSpacingVertical

  const setOpenRef = (state) => {
    openRef.current = state
    setOpen(state)
  }

  const handleForceClose = () => setOpenRef("close")
  const handleOpen = () => {
    if(openRef.current === "keepOpen")
      return;

      setOpenRef("open")
  }
  const handleClose = () => {
    if(openRef.current === "keepOpen")
      return;

    handleForceClose()
  }

  const getAvatarGroupClassStatus = () => {
    const isOpen = 
      open === "open" ||
      open === "keepOpen"

    const className = isDirectionHorizontal
      ? classes.avatarGroupOpenHorizontal
      : classes.avatarGroupOpenVertical

    return isOpen ? className : ""
  }


  const avatars = avatarsProps
    ?.map((avatarProps, index) =>       
      <AvatarWithTooltip
        {...avatarProps}
        placement={isDirectionHorizontal ? "bottom" : "left"}
        key={index}
        style={{zIndex: numberOfAvatar - index}}
        buttonClassName={`${classes.avatar} ${avatarSpacingClassName} ${getAvatarGroupClassStatus()}`}
      />     
    )

  const extraAvatarsIcon = 
    <AvatarWithTooltip
      disableLoading
      TooltipComponent={Tooltip}
      tooltipTitle="Mostra tutti gli utenti."
      placement={isDirectionHorizontal ? "bottom" : "left"}
      style={{zIndex: numberOfAvatar + 1}}
      onClick={_ => {
        props.onExtraAvatarClick?.()
        handleForceClose()
      }}
      className={classes.finalAvatar}
      buttonClassName={`${classes.avatar} ${getAvatarGroupClassStatus()}`}
    >
      <MenuOpenRoundedIcon style={{color: theme.palette.secondary.contrastText}}/>
    </AvatarWithTooltip>

  return (
    <div
      className={`${avatarGroupClassName} ${props.className ? props.className : ""}`}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onTouchStart={handleOpen}
      onTouchMove={handleClose}
    >
      {
        !props.loading &&
          <>
            {extraAvatarsIcon}
            {avatars}
          </>     
      }
    </div>
  )
}

CustomAvatarGroup.defaultProps = {
  direction: "horizontal",
  spacing: 12,
  borderWidth: 4,
}