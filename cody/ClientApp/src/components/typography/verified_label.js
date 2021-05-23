import { makeStyles } from '@material-ui/core/styles';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles((theme) => ({
  verified: props => ({
    transform: props.translateIconY ?
      `translate(0px, ${props.translateIconY}px)` : "translate(0px, 4px)",
    marginLeft: `${theme.spacing(1)}px !important`,
    fontSize: props.iconSize,
    color: theme.palette.text.secondary
  })
}));

export const VerifiedLabel = (props) => {
  const {
    label,
    verified,
    translateIconY,
    iconSize
  } = props
  const classes = useStyles({translateIconY, iconSize});

  if(verified)
    return (
      <>
        {label}<CheckCircleRoundedIcon className={classes.verified}/>
      </>
    )
  
  return label ?? null
}

VerifiedLabel.defaultProps = {
  iconSize: 18
}