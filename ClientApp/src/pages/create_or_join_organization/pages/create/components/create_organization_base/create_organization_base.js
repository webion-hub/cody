import React from 'react';

import { TextField, Grid, InputAdornment, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';

import { tryCreateOrganization } from '../../lib/try_create_organization';

import { NextFocus } from 'src/lib/next_focus';

import { AddLocation } from './add_location';
import { prepareData } from '../../lib/prepare_data';
import { CreateOrganizationContainer } from '../create_organization_container';
import { PageController } from 'src/lib/page_controller';
import { AvatarAddPhoto } from 'src/components/avatars/avatar_add_photo';
import { PickerWithErrorAndLabel } from 'src/components/textfields/picker_with_error_and_label';
import { DescriptionTextField } from 'src/components/textfields/description_text_field';

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
    logo: null,
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
  
  const handleImage = (value) => {
    setData({
      ...data,
      logo: value
    })
  }

  const handleSubmit = () => {
    setLoading(true)
    setErrors(noErrors)
    setExistingOrganization(false)

    tryCreateOrganization({
      data: prepareData(data),
      kind: props.type,
      onSuccess: (id) => PageController.push(`/organization/${id}`),
      onConflict: () => setExistingOrganization(true),
      onFormatError: setErrors
    })
    .finally(_ => setLoading(false))
  }

  return(
    <CreateOrganizationContainer
      label="Conferma"
      onClick={handleSubmit}
      loading={loading}
    >
      <AvatarAddPhoto
        showOverlay
        disableLoading
        className={classes.addPhoto}
        imageSize={100}
        onImageChange={handleImage}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <PickerWithErrorAndLabel
          fadeError={existingOrganization}
          errorMessage={props.errorLabel}
          errorPosition="center"
        >
          <TextField
            className={classes.fieldWithText}
            color="secondary"
            label={props.nameLabel}
            required
            fullWidth
            variant="filled"
            error={errors.organizationNameError}
            onChange={handleData("name")}
            inputRef={nextFocus.getInput("name")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <GroupRoundedIcon />
                </InputAdornment>
              ),
            }}
            onKeyDown={nextFocus.enterPressedFocusOn(
              props.type === "Team" 
                ? "website" 
                : "location"
            )}
          />
        </PickerWithErrorAndLabel>
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
          onKeyDown={nextFocus.enterPressedFocusOn("description")}
        />
        <div
          className={classes.fieldWithText}
        >
          <DescriptionTextField
            color="secondary"
            variant="filled"
            error={errors.descriptionError}
            onChange={handleData("description")}
            inputRef={nextFocus.getInput("description")}
            fullWidth
            descriptionLength={data.description.length}
          />
        </div>
      </Grid>
    </CreateOrganizationContainer>
  );
}