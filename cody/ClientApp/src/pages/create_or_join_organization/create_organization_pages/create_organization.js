import React from 'react';

import { Grid, Typography, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';

import { TeamWork } from 'src/components/illustrations/team_work';
import { CreateOrganizationBase } from 'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/create_organization_base';

import { PageController } from 'src/lib/page_controller';

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
}));


const organizationKinds = [
  {
    value: 'team',
    label: 'Team',
    icon: GroupRoundedIcon,
  },
  {
    value: 'school',
    label: 'Istituto Scolastico',
    icon: SchoolRoundedIcon,
  },
  {
    value: 'company',
    label: 'Azienda',
    icon: BusinessCenterRoundedIcon,
  },
];

export function CreateOrganization(props){
  const classes = useStyles();
  const [organizationKind, setOrganizationKind] = React.useState('team');

  const handleChange = (event) => {
    setOrganizationKind(event.target.value);
  };

  return(
    <CreateOrganizationBase
      label="Avanti"
      href={`/organization#create${organizationKind}`}
      onClick={(e) => PageController.updateHash(`create${organizationKind}`, e)}
    >
      <div className={classes.imageContainer}>
        <TeamWork size="100%"/>
      </div>
      <TextField
        className={classes.organizationSelectionField}
        select
        color="secondary"
        label="Organizzazione"
        value={organizationKind}
        onChange={handleChange}
        helperText="Scegli il tipo di organizzazione"
        fullWidth
        variant="outlined"
      >
        {organizationKinds.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Grid
              container
              direction="row"
              alignItems="center"
            >
              <option.icon fontSize="small"/>
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
    </CreateOrganizationBase>
  );
}