import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Tooltip } from '@material-ui/core';
import { getOrganizationKindIcon } from 'src/lib/get_organization_kind_icon';


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
  const handleFilter = props.handleFilter;

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
          onClick={() => handleFilter("teams")}
          variant={filterStatus.teams ? "contained" : "outlined"}
        >
          {getOrganizationKindIcon("team")}
        </Button>
      </Tooltip>
      <Tooltip
        arrow
        title="Filtre per scuole"
      >
        <Button
          onClick={() => handleFilter("school")}
          variant={filterStatus.schools ? "contained" : "outlined"}
        >
          {getOrganizationKindIcon("school")}
        </Button>
      </Tooltip>
      <Tooltip
        arrow
        title="Filtre per aziende"
      >
        <Button
          onClick={() => handleFilter("companies")}
          variant={filterStatus.companies ? "contained" : "outlined"}
        >
          {getOrganizationKindIcon("company")}
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}