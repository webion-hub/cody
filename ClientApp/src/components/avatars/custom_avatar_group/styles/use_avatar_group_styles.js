import { makeStyles } from '@material-ui/core/styles';

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

export const useAvatarGroupStyles = makeStyles((theme) => ({
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
}));