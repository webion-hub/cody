import React from 'react';

import { TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AutocompleteWithVirtualizer } from 'src/components/lists/autocomplete_with_virtualizer/autocomplete_with_virtualizer';
import { Cities } from 'src/lib/server_calls/cities';
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
  locationLabel: {
    width: "calc(100% - 42px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }
}));

export function AddLocation(props){
  const classes = useStyles();
  const nextFocus = props.nextFocus;
  const errors = props.errors;
  const [locationSearchResults, setLocationSearchResults] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const handleLocation = (event, reason) => {
    if(reason !== "input")
      return;

    const locationSearchValue = event.target.value;

    if(locationSearchValue === "")
      return;

    setLoading(true)
    Cities
      .find(locationSearchValue)
      .then(results => {
        setLoading(false)
        setLocationSearchResults([...results])
      });
  }

  const handleChange = (value) => { 
    if(value !== null)
      props.onChange(value.location)
    else 
      setLocationSearchResults([])
  }

  if(props.hide)
    return <></>;

  return(
    <AutocompleteWithVirtualizer
      className={`${classes.autocomplete} ${props.className}`}
      heightbig={45}
      heightsmall={50}
      options={locationSearchResults}
      getOptionLabel={(option) => option.location}
      filterOptions={(x) => x}
      fullWidth
      loading={loading}
      onChange={(_, value) => handleChange(value)}
      onInputChange={(event, _, reason) => handleLocation(event, reason)}
      popupIcon={<LocationOnRoundedIcon/>}
      renderOption={(option) => (
        <React.Fragment>
          <Grid
            container
            direction="row"
            alignItems="center"
          >
            <Grid item className={classes.locationIcon}>
              <LocationOnRoundedIcon/>
            </Grid>
            <Grid item className={classes.locationLabel}>
              {option.location}
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
            onKeyDown={nextFocus.enterPressedFocusOn("website")}
          />
      }
    />
  );
}