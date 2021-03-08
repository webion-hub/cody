import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


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
      <Button
        onClick={() => handleFilter("teams")}
        variant={filterStatus.teams ? "contained" : "outlined"}
      >
        <GroupRoundedIcon/>
      </Button>
      <Button
        onClick={() => handleFilter("schools")}
        variant={filterStatus.schools ? "contained" : "outlined"}
      >
        <SchoolRoundedIcon/>
      </Button>
      <Button
        onClick={() => handleFilter("companies")}
        variant={filterStatus.companies ? "contained" : "outlined"}
      >
        <BusinessCenterRoundedIcon/>
      </Button>
    </ButtonGroup>
  );
}