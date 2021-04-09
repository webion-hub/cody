import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles((theme) => ({
  verifiedOrganization: props => ({
    transform: props.translateIconY ?
      `translate(0px, ${props.translateIconY}px)` : "translate(0px, 4px)",
    marginLeft: theme.spacing(1),
    fontSize: 18,
    color: theme.palette.text.secondary
  })
}));

export const OrganizationLabel = ({organization, translateIconY}) => {
  const classes = useStyles({translateIconY});

  if(organization?.state.hasBeenVerified)
    return (
      <>
        {organization?.name}<CheckCircleRoundedIcon className={classes.verifiedOrganization} fontSize="small"/>
      </>
    )
  else
    return organization? organization.name : null
}