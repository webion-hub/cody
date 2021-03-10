import React from 'react';

import { TextField, Fade, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TeamMeeting } from 'src/components/illustrations/team_meeting';
import { CreateOrganizationBase } from 'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/create_organization_base';
import { tryCreateOrganization } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/try_create_organization';

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

  const [error, setError] = React.useState(false)
  const [existingOrganization, setExistingOrganization] = React.useState(false)

  const [loading, setLoading] = React.useState(false)

  const handleValue = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = () => {
    setLoading(true)
    setError(false)
    setExistingOrganization(false)

    tryCreateOrganization({
      data: {
        name: name,
        city: null,
        country: null,
        website: null,
        description: "",
      },
      kind: "Team",
      onSuccess: () => alert("bravo"),
      onConflict: () => setExistingOrganization(true),
      onError: (err) => {},
      onFormatError: (err) => {console.log(err) 
        setError(true)}
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
        fullWidth
        error={error || existingOrganization}
        onChange={handleValue}
        variant="filled"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit()
          }
        }}
      />
      <Fade
        in={existingOrganization}
      >
        <Typography
          variant="caption"
          color="error"
        >
          Errore, team già esistente!
        </Typography>
      </Fade>
    </CreateOrganizationBase>
  );
}