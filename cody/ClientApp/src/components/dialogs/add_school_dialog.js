
import React from 'react';

import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { DialogBase } from 'src/components/bases/dialog_base'
import { NextFocus } from 'src/lib/next_focus';
import { School } from 'src/lib/school';
import { LoadingButton } from 'src/components/buttons/loading_button';
 
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import PublicRoundedIcon from '@material-ui/icons/PublicRounded';

import { Graduation } from 'src/components/illustrations/graduation';
import { Form } from 'src/lib/default_values/sizes/form_size';

export function AddSchoolDialog(props){
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false); 
  const [school, setSchool] = React.useState({
    id: null,
    name: "",
    city: "",
    country: "",
  });

  const nextFocus = new NextFocus(["name","city","country"]);

  const isDisabledButton = () => {
    const emptyName = school.name === ""
    const emptyCity = school.city === ""
    const emptyCountry = school.country === ""

    return emptyName || emptyCity || emptyCountry;
  }
  
  const handleClose = () => {
    const {onClose} = props;
    onClose(false);
  }

  const handleChange = (dataName) => (event) => {
    setSchool({
      ...school,
      [dataName]: event.target.value
    });
  }  

  const tryAddSchool = () => {
    setError(false);
    setLoading(true);

    School.createNew({
      school: {
        name: school.name,
        city: school.city,
        country: school.country,
      },
      onError: existingId => {
        setError(true);
        setLoading(false);
      },
      onSuccess: newId => {
        setLoading(false);
        setSchool({
          ...school,
          id: newId
        })

        submitSchool();
        handleClose();
      },
    })
  }

  const submitSchool = () => {
    const {onSchoolChange} = props;
    onSchoolChange(school); 
  }

  return(
    <DialogBase
      open={props.open}
      onClose={handleClose}
      title="Aggiungi il tuo istituto"
      firstButton={
        <Button
          onClick={handleClose}
          color="secondary"
          disabled={loading}
        >
          Chiudi
        </Button>
      }
      secondButton={
        <LoadingButton
          loading={loading}
          label="Aggiungi"
          disabled={isDisabledButton()}
          onClick={_ => {
            tryAddSchool();
          }}
        />
      }
    >
      <BasePhotoText
        image={<Graduation size={Form.imageWidth}/>}
        formWidth={Form.width}
        margin={1}
        items={[
          <TextField
            id="school_name"
            label="Nome Istituto"
            variant="outlined"
            color="secondary"
            inputRef={nextFocus.getInput("name")} 
            fullWidth={true}   
            error={error}
            onChange={handleChange('name')}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                nextFocus.focusOn("city");
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolRoundedIcon />
                </InputAdornment>
              ),
            }}
          />,
          <TextField
            id="school_city"
            label="Città"
            variant="outlined"
            color="secondary"
            inputRef={nextFocus.getInput("city")} 
            fullWidth={true}   
            error={error} 
            onChange={handleChange('city')}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                nextFocus.focusOn("country");
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCityRoundedIcon />
                </InputAdornment>
              ),
            }}
          />,
          <Box>
            <TextField
              id="school_county"
              label="Stato"
              variant="outlined"
              color="secondary"
              inputRef={nextFocus.getInput("country")}
              fullWidth={true}
              error={error}
              onChange={handleChange('country')}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  nextFocus.removeFocus();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PublicRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Fade
              in={error}
            >
              <Typography
                variant="caption"
                color="error"
              >
                Scuola già inserita!
              </Typography>
            </Fade>
          </Box>
        ]}
      />
    </DialogBase>
  )
}