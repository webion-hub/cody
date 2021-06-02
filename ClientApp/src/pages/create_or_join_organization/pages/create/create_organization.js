import React from 'react';

import { Grid, Typography, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { CreateOrganizationContainer } from './components/create_organization_container';

import { PageController } from 'src/lib/page_controller';
import { OrganizationKindIcon } from 'src/components/icons/organization_kind_icon';
import { TeamWork } from 'src/components/illustrations/illustrations/illustrations';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "100%",
    maxWidth: 300
  },
  organizationSelectionField: {
    maxWidth: 300
  },
  menuLabel: {
    paddingLeft: theme.spacing(2)
  },
  helperText: {
    textAlign: 'center'
  }
}));


const organizationKinds = [
  {
    value: 'team',
    label: 'Team',
  },
  {
    value: 'school',
    label: 'Istituto Scolastico',
  },
  {
    value: 'company',
    label: 'Azienda',
  },
];

export const createOrganizationSettings = {
  title: "Crea un'organizzazione",
  width: 450,
  height: 484,
}

export default function CreateOrganization(){
  const classes = useStyles();
  const [organizationKind, setOrganizationKind] = React.useState('team');

  const handleChange = (event) => {
    setOrganizationKind(event.target.value);
  };

  return(
    <CreateOrganizationContainer
      label="Avanti"
      href={`/organization#create${organizationKind}`}
      onClick={(e) => PageController.updateHash(`create${organizationKind}`, e)}
    >
      <div className={classes.imageContainer}>
        <TeamWork/>
      </div>
      <TextField
        className={classes.organizationSelectionField}
        select
        color="secondary"
        label="Organizzazione"
        value={organizationKind}
        onChange={handleChange}
        FormHelperTextProps={{className: classes.helperText}}
        helperText="Scegli il tipo di organizzazione"
        fullWidth
        variant="filled"
      >
        {organizationKinds.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Grid
              container
              direction="row"
              alignItems="center"
            >
              <OrganizationKindIcon kind={option.value} size="small"/>
              <Typography
                className={classes.menuLabel}
                variant="inherit" 
                noWrap
              >
                {option.label}
              </Typography>  
            </Grid>            
          </MenuItem>
        ))}
      </TextField>
    </CreateOrganizationContainer>
  );
}