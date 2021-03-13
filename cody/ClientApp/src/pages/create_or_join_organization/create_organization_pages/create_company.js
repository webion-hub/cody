import React from 'react';

import { TextField, Grid, Typography, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { CreateOrganizationBase } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/create_organization_base';
import { tryCreateOrganization } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/try_create_organization';

import { NextFocus } from 'src/lib/next_focus';
import { FormatLengthController } from 'src/lib/format_controller/format_length_controller'

const useStyles = makeStyles((theme) => ({
  schoolFields: {
    maxWidth: 300,
    marginBottom: theme.spacing(2)
  },
  fieldWithText: {
    maxWidth: 300,
    width: "100%"
  }
}));

export function CreateCompany(props){
  const classes = useStyles();
  const nextFocus = new NextFocus(["name", "city", "country","website","description"]);

  const [data, setData] = React.useState({
    name: "",
    city: "",
    country: "",
    website: "",
    description: "",
  })
  const noErrors = {
    organizationNameError: false,
    cityError: false,
    countryError: false,
    websiteError: false,
    descriptionError: false,
  }
  const [errors, setErrors] = React.useState(noErrors)
  const [existingOrganization, setExistingOrganization] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleData = (dataName) => (event) => {
    setData({
      ...data,
      [dataName]: event.target.value
    })
  }

  const handleSubmit = () => {
    setLoading(true)
    setErrors(noErrors)
    setExistingOrganization(false)

    tryCreateOrganization({
      data: data,
      kind: "Company",
      onSuccess: () => alert("bravo"),
      onConflict: () => setExistingOrganization(true),
      onError: (err) => {},
      onFormatError: (err) => setErrors(err)
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
          className={classes.fieldWithText}
          color="secondary"
          label="Nome Azienda"
          required
          fullWidth
          variant="filled"
          error={errors.organizationNameError || existingOrganization}
          onChange={handleData("name")}
          inputRef={nextFocus.getInput("name")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("city");
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
            Errore, azienda già esistente!
          </Typography>
        </Fade>
        <TextField
          className={classes.schoolFields}
          color="secondary"
          label="Città"
          required
          fullWidth
          variant="filled"
          error={errors.cityError}
          onChange={handleData("city")}
          inputRef={nextFocus.getInput("city")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("country");
            }
          }}
        />
        <TextField
          className={classes.schoolFields}
          color="secondary"
          label="Stato"
          required
          fullWidth
          variant="filled"
          error={errors.countryError}
          onChange={handleData("country")}
          inputRef={nextFocus.getInput("country")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("website");
            }
          }}
        />
        <TextField
          className={classes.schoolFields}
          color="secondary"
          label="Sito web"
          fullWidth
          variant="filled"
          error={errors.websiteError}
          onChange={handleData("website")}
          inputRef={nextFocus.getInput("website")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("description");
            }
          }}
        />
        <div
          className={classes.fieldWithText}
        >
          <TextField
            color="secondary"
            label="Descrizione"
            multiline
            fullWidth
            rows={6}
            variant="filled"
            error={errors.descriptionError}
            onChange={handleData("description")}
            inputRef={nextFocus.getInput("description")}
          />
          <Typography
            variant="caption"
            color={errors.descriptionError ? "error" : "textSecondary"}
          >
            {data.description.length}/{`${FormatLengthController.set('description').max}`}
          </Typography>
        </div>
      </Grid>
    </CreateOrganizationBase>
  );
}