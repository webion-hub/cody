import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Tooltip } from '@material-ui/core';
import { OrganizationKindIcon } from 'src/components/organization_kind_icon';


const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: theme.spacing(1),
    },
  },
}));

export function FilterComponent(props){
  const classes = useStyles();
  const filterStatus = props.filterStatus;
  const setFilter = props.setFilter;

  return(
    <ButtonGroup
      color="secondary"
      className={classes.buttonGroup}
    >
      <Tooltip
        arrow
        title="Filtra per teams"
      >
        <Button
          onClick={() => setFilter("teams")}
          variant={filterStatus.teams ? "contained" : "outlined"}
        >
          <OrganizationKindIcon kind="team"/>
        </Button>
      </Tooltip>
      <Tooltip
        arrow
        title="Filtre per scuole"
      >
        <Button
          onClick={() => setFilter("schools")}
          variant={filterStatus.schools ? "contained" : "outlined"}
        >
          <OrganizationKindIcon kind="school"/>
        </Button>
      </Tooltip>
      <Tooltip
        arrow
        title="Filtre per aziende"
      >
        <Button
          onClick={() => setFilter("companies")}
          variant={filterStatus.companies ? "contained" : "outlined"}
        >
          <OrganizationKindIcon kind="company"/>
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}