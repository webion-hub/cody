import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles((theme) => ({
  verifiedOrganization: {
    transform: "translate(0px, 4px)",
    marginLeft: theme.spacing(1),
    fontSize: 18,
    color: theme.palette.text.secondary
  }
}));

export const OrganizationLabel = ({organization}) => {
  const classes = useStyles();

  if(organization.state.hasBeenVerified)
    return (
      <>
        {organization.name}<CheckCircleRoundedIcon className={classes.verifiedOrganization} fontSize="small"/>
      </>
    )
  else
    return organization.name
}