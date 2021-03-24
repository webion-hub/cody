import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { DialogBase } from 'src/components/bases/dialog_base';
import { Form } from 'src/lib/default_values/sizes/form_size';
import { languages } from 'src/lib/default_values/lists/coding_languages';

import { Coding } from 'src/components/illustrations/coding';


const useStyles = makeStyles((theme) => ({
  menuPaper: {
    backgroundColor: theme.palette.background.default,
  }
}));

export function CodingFilterDialog(props) {
  const classes = useStyles();
  const [languageValue, setLanguageValue] = React.useState(null);
  const [defaultLanguage, setDefaultLanguage] = React.useState(props.defaultValue);

  const handleChange = (value) => {
    setLanguageValue(value);
    setDefaultLanguage(value);
  }

  const handleSubmit = () => {
    const {onLanguageChange} = props;
    onLanguageChange(languageValue); 
    props.onClose();
  }

  return (
    <DialogBase
      open={props.open}
      onClose={props.onClose}
      title="Filtra il linguaggio"
      titleAlign="center"
      secondButton={
        <Button 
          variant="contained"
          onClick={handleSubmit} 
          color="primary"
        >
          Conferma
        </Button>
      }
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Coding size={Form.imageWidth}/>
        <Autocomplete
          id="autocomplete"
          options={languages}
          getOptionLabel={(option) => option.title}
          style={{ 
            maxWidth: Form.width,
            width: "100%"
          }}
          value={defaultLanguage}
          classes={{paper: classes.menuPaper}}
          onChange={(event, value) => handleChange(value)}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              {option.icon}
              <Box ml={2}>
                {option.title}   
              </Box>                       
            </React.Fragment>
          )}
          renderInput={(params) => 
            <TextField 
              {...params} 
              label="Cerca un linguaggio" 
              variant="outlined"
              color="secondary" 
            />
          }
        />
      </Grid>      
    </DialogBase>
  );
}


