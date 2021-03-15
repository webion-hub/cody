import React from 'react';

import { TextField, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AutocompleteWithVirtualizer } from 'src/components/autocomplete_with_virtualizer/autocomplete_with_virtualizer';
import { Cities } from 'src/lib/cities';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    "& .MuiAutocomplete-popupIndicatorOpen": {
      transform: "none !important",
    },
    "& .MuiAutocomplete-endAdornment": {
      right: 12
    }
  },
  locationIcon: {
    marginRight: theme.spacing(2)
  },
}));

export function AddLocation(props){
  const classes = useStyles();
  const nextFocus = props.nextFocus;
  const errors = props.errors;
  const [locationSearchValue, setLocationSearchValue] = React.useState("")
  const [locationSearchResults, setLocationSearchResults] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const handleLocation = (event) => {
    const value = event.target.value;
    setLocationSearchValue(value)
  }

  const handleChange = (value) => { 
    props.onChange(value)

    if(value === null){
      setLocationSearchValue("")
      setLocationSearchResults([])
    }
  }

  const handleSubmitLocation = () => {
    if(locationSearchValue === "")
      return;

    setLoading(true)
    Cities
      .find(locationSearchValue)
      .then(results => {
        setLoading(false)
        setLocationSearchResults(results)
      });
  }

  if(props.hide)
    return <></>;

  return(
    <AutocompleteWithVirtualizer
      className={`${classes.autocomplete} ${props.className}`}
      heightbig={45}
      heightsmall={50}
      options={locationSearchResults}
      getOptionLabel={(option) => `${option.name} ${option.region} ${option.country}`}
      filterOptions={(x) => x}
      fullWidth
      loading={loading}
      onChange={(event, value) => handleChange(value)}
      onInputChange={handleLocation}
      popupIcon={<LocationOnRoundedIcon/>}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Grid
            container
            direction="row"
            alignItems="center"
          >
            <Grid item className={classes.locationIcon}>
              <LocationOnRoundedIcon/>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
              >
                {option.name}
                <Typography                 
                  variant="caption"
                  color="textSecondary"
                >
                  {option.region} {option.country}
                </Typography>  
              </Grid>
            </Grid> 
          </Grid>                 
        </React.Fragment>
      )}
      renderInput={
        (params) => 
          <TextField
            {...params}
            color="secondary"
            label="Città"
            required
            error={errors.locationError}
            variant="filled"
            inputRef={nextFocus.getInput("location")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitLocation()
                //nextFocus.focusOn("website");
              }
            }}
          />
      }
    />
  );
}