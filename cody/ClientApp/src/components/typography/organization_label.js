import { makeStyles } from '@material-ui/core/styles';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles((theme) => ({
  verifiedOrganization: props => ({
    transform: props.translateIconY ?
      `translate(0px, ${props.translateIconY}px)` : "translate(0px, 4px)",
    marginLeft: `${theme.spacing(1)}px !important`,
    fontSize: props.iconSize,
    color: theme.palette.text.secondary
  })
}));

export const OrganizationLabel = (props) => {
  const {
    organization,
    translateIconY,
    iconSize
  } = props
  const classes = useStyles({translateIconY, iconSize});

  if(organization?.state.hasBeenVerified)
    return (
      <>
        {organization?.name}<CheckCircleRoundedIcon className={classes.verifiedOrganization}/>
      </>
    )
  else
    return organization? organization.name : null
}

OrganizationLabel.defaultProps = {
  iconSize: 18
}