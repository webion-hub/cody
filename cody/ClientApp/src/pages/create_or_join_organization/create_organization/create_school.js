import React from 'react';

import { TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { CreateOrganizationBase } from './create_organization_base';
import { Organizations } from 'src/lib/organizations';
import { NextFocus } from 'src/lib/next_focus';

const useStyles = makeStyles((theme) => ({
  schoolName: {
    maxWidth: 300,
    marginBottom: theme.spacing(2)
  },
}));

export function CreateSchool(props){
  const classes = useStyles();
  const nextFocus = new NextFocus(["name", "city", "country","website","description"]);

  const [data, setData] = React.useState({
    name: "",
    city: "",
    country: "",
    website: "",
    description: "",
  })
  const [error, setError] = React.useState({
    name: "",
    city: "",
    country: "",
    website: "",
    description: "",
  })
  const [loading, setLoading] = React.useState(false)

  const handleData = (dataName) => (event) => {
    setData({
      ...data,
      [dataName]: event.target.value
    })
  }

  const handleSubmit = () => {
    setLoading(true)
    setError("")
    Organizations.createNew({
      organization: {
        name: data.name,
        city: data.city,
        country: data.country,
        website: data.website,
        description: data.description,
        kind: 'School',
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
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <TextField
          className={classes.schoolName}
          color="secondary"
          label="Nome Scuola"
          required
          fullWidth
          variant="filled"
          error={error.name !== ""}
          onChange={handleData("name")}
          inputRef={nextFocus.getInput("name")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("city");
            }
          }}
        />
        <TextField
          className={classes.schoolName}
          color="secondary"
          label="Città"
          required
          fullWidth
          variant="filled"
          error={error.city !== ""}
          onChange={handleData("city")}
          inputRef={nextFocus.getInput("city")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("country");
            }
          }}
        />
        <TextField
          className={classes.schoolName}
          color="secondary"
          label="Stato"
          required
          fullWidth
          variant="filled"
          error={error.country !== ""}
          onChange={handleData("country")}
          inputRef={nextFocus.getInput("country")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("website");
            }
          }}
        />
        <TextField
          className={classes.schoolName}
          color="secondary"
          label="Sito web"
          fullWidth
          variant="filled"
          error={error.website !== ""}
          onChange={handleData("website")}
          inputRef={nextFocus.getInput("website")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("description");
            }
          }}
        />
        <TextField
          className={classes.schoolName}
          color="secondary"
          label="Descrizione"
          multiline
          fullWidth
          rows={6}
          variant="filled"
          error={error.description !== ""}
          onChange={handleData("description")}
          inputRef={nextFocus.getInput("description")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit()
            }
          }}
        />
      </Grid>
    </CreateOrganizationBase>
  );
}