import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { AvatarButton } from "./buttons/avatar_button";

const useStyles = makeStyles((theme) => ({
  avatarGroupHorizontal: props => ({
    width: "fit-content",
    margin: props.borderWidth,
    display: "flex",
    "&:hover": {
      "& > *": {
        marginLeft: 8,
        boxShadow: "none",
      }
    }
  }),
  avatarGroupVertical: props => ({
    width: "min-content",      
    margin: props.borderWidth,
    display: "block",
    "&:hover": {
      "& > *": {
        marginTop: 8,
      }
    }
  }),

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
  const avatarsProps = props.avatarsProps
  const numberOfAvatar = avatarsProps ? avatarsProps.length : 0
  const numberOfExtraAvatar = props.numberOfAvatar - numberOfAvatar

  const isDirectionHorizontal = props.direction === "horizontal"

  const tooltipPlacement =  isDirectionHorizontal
    ? "bottom" 
    : "left"

  const avatarGroupClassName = isDirectionHorizontal 
    ? classes.avatarGroupHorizontal
    : classes.avatarGroupVertical

  const avatarSpacingClassName = isDirectionHorizontal 
    ? classes.avatarSpacingHorizontal
    : classes.avatarSpacingVertical

  const avatars = avatarsProps
    ?.map((avatarProps, index) => {
      const {onClick, ...otherProps} = avatarProps
      return (
        <AvatarButton
          {...otherProps}
          key={index}
          style={{zIndex: numberOfAvatar - index}}
          placement={tooltipPlacement}
          onClick={onClick}
          buttonClassName={`${classes.avatar} ${avatarSpacingClassName}`}
        />
      )
    })

  const avatarList = 
    <>
      <AvatarButton
        disableLoading
        style={{zIndex: numberOfAvatar + 1}}
        onClick={props.onExtraAvatarClick}
        placement={tooltipPlacement}
        alt="Mostra tutti gli utenti"
        className={classes.finalAvatar}
        buttonClassName={classes.avatar}
      >
        <Typography variant="caption">
          {`+${numberOfExtraAvatar}`}
        </Typography>
      </AvatarButton>
      {avatars}
    </>

  return (
    <div
      className={`${avatarGroupClassName} ${props.className}`}
    >
      {!props.loading && avatarList}
    </div>
  )
}

CustomAvatarGroup.defaultProps = {
  direction: "horizontal"
}