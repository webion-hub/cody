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
        boxShadow: "none",
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
    boxShadow: `0 0 0 ${props.borderWidth}px ${props.borderColor}`,
    borderRadius: "50%",
    "&:hover": {
      transform: "scale(1.2)",
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
  const numberOfExtraAvatar = props.numberOfAvatar - avatarsProps?.length

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
          placement={tooltipPlacement}
          onClick={onClick}
          buttonClassName={`${classes.avatar} ${index !== 0 ? avatarSpacingClassName : ""}`}
        />
      )
    })

  const avatarList = 
    <>
      {avatars}
      {
        numberOfExtraAvatar !== 0 &&
          <AvatarButton
            onClick={props.onExtraAvatarClick}
            placement={tooltipPlacement}
            alt="Mostra gli altri utenti"
            className={classes.finalAvatar}
            buttonClassName={`${classes.avatar} ${avatarSpacingClassName}`}
          >
            <Typography variant="caption">
              {`+${numberOfExtraAvatar}`}
            </Typography>
          </AvatarButton>
      }
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