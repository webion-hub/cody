import React from 'react';

import { TextField, Grid, Typography, Fade, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';

import { CreateOrganizationContainer } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/create_organization_base/create_organization_container';
import { tryCreateOrganization } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/try_create_organization';
import { AddPhoto } from 'src/components/pickers/add_photo';

import { NextFocus } from 'src/lib/next_focus';
import { FormatLengthController } from 'src/lib/format_controller/format_length_controller';


import { AddLocation } from './add_location';

const useStyles = makeStyles((theme) => ({
  fields: {
    maxWidth: 300,
    marginBottom: theme.spacing(2)
  },
  fieldWithText: {
    maxWidth: 300,
    width: "100%"
  },
  addPhoto: {
    marginBottom: theme.spacing(2)
  }
}));

export function CreateOrganizationBase(props){
  const classes = useStyles();
  const nextFocus = new NextFocus(["name", "location", "website", "description"]);

  const [data, setData] = React.useState({
    name: "",
    location: null,
    website: "",
    description: "",
  })
  const noErrors = {
    organizationNameError: false,
    locationError: false,
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

  const handleLocation = (value) => {
    setData({
      ...data,
      location: value
    })
  }

  const prepareData = (data) => {
    return {
      name: data.name,
      location: data.location? data.location : "",
      website: data.website,
      description: data.description,
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    setErrors(noErrors)
    setExistingOrganization(false)

    tryCreateOrganization({
      data: prepareData(data),
      kind: props.type,
      onSuccess: () => alert("bravo"),
      onConflict: () => setExistingOrganization(true),
      onError: (err) => {},
      onFormatError: (err) => setErrors(err)
    })
    .then(() => setLoading(false))
  }

  return(
    <CreateOrganizationContainer
      label="Conferma"
      onClick={handleSubmit}
      loading={loading}
    >
      <AddPhoto
        disableLoading
        className={classes.addPhoto}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <TextField
          className={classes.fieldWithText}
          color="secondary"
          label={props.nameLabel}
          required
          fullWidth
          variant="filled"
          error={errors.organizationNameError || existingOrganization}
          onChange={handleData("name")}
          inputRef={nextFocus.getInput("name")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <GroupRoundedIcon />
              </InputAdornment>
            ),
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("location");
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
            {props.errorLabel}
          </Typography>
        </Fade>
        <AddLocation
          hide={props.type === "Team"}
          className={classes.fields}
          onChange={handleLocation}
          errors={errors}
          nextFocus={nextFocus}
        />
        <TextField
          className={classes.fields}
          color="secondary"
          label="Sito web"
          fullWidth
          variant="filled"
          error={errors.websiteError}
          onChange={handleData("website")}
          inputRef={nextFocus.getInput("website")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LanguageRoundedIcon />
              </InputAdornment>
            ),
          }}
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
    </CreateOrganizationContainer>
  );
}