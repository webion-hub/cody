import React from 'react';

import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TeamMeeting } from 'src/components/illustrations/team_meeting';
import { CreateOrganizationBase } from './create_organization_base';
import { Organizations } from 'src/lib/organizations';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "100%",
    maxWidth: 300
  },
  teamName: {
    maxWidth: 300
  },
}));

export function CreateTeam(props){
  const classes = useStyles();
  const [name, setName] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleValue = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = () => {
    setLoading(true)
    setError("")
    Organizations.createNew({
      organization: {
        name: name,
        kind: 'Team',
      },
      onSuccess: newOrgId => {
        // Organization created
      },
      onConflict: () => setError("Errore, organizzazione già esistente"),
      onError: () => setError("Errore"),
    })
    .then(() => setLoading(false))    
  }

  return(
    <CreateOrganizationBase
      label="Conferma"
      onClick={handleSubmit}
      loading={loading}
    >
      <div className={classes.imageContainer}>
        <TeamMeeting size="100%"/>
      </div>
      <TextField
        className={classes.teamName}
        color="secondary"
        label="Nome team"
        helperText={error}
        fullWidth
        error={error !== ""}
        onChange={handleValue}
        variant="filled"
      />
    </CreateOrganizationBase>
  );
}