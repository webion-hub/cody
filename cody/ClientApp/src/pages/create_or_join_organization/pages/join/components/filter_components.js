import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Tooltip } from '@material-ui/core';
import { OrganizationKindIcon } from 'src/components/organization_kind_icon';


const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    borderColor: "transparent",
    "& > *": {
      borderRight: `1px solid ${theme.palette.background.paper} !important`,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
  },
}));

export const FilterComponent = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const filterStatus = props.filterStatus;
  const setFilter = props.setFilter;

  return(
    <ButtonGroup
      ref={ref}
      variant="contained"
      className={`${classes.buttonGroup} ${props?.className}`}
    >
      <Tooltip
        arrow
        title="Filtra per teams"
      >
        <Button
          onClick={() => setFilter("teams")}
          color={filterStatus.teams ? "primary" : "secondary"}
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
          color={filterStatus.schools ? "primary" : "secondary"}
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
          color={filterStatus.companies ? "primary" : "secondary"}
        >
          <OrganizationKindIcon kind="company"/>
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
})