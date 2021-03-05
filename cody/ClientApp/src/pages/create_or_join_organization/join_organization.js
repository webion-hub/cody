import React from 'react';
import { useTheme, Grid, ListItemText, List, ListItem, ListItemIcon, ListItemSecondaryAction, IconButton, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { TitleInfoContentBase } from 'src/components/bases/title_info_content_base';
import { GenericSearchBar } from 'src/components/pickers/search_bar/generic_search_bar';

import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { SchoolRounded } from '@material-ui/icons';
import { FlowingText } from 'src/components/typography/flowing_text';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: theme.spacing(1),
    },
  },
  listContainer: {
    marginTop: theme.spacing(1),
    height: 300,
    overflow: "auto"
  }
}));

export function JoinOrganization(props){
	const theme = useTheme();
  const classes = useStyles();
  const [filterStatus, setFilterStatus] = React.useState({
    teams: true,
    schools: true,
    companies: true,
  });

  const handleFilter = (filter) => {
    setFilterStatus({
      ...filterStatus,
      [filter]: !filterStatus[filter]
    })
  }

  return(
    <TitleInfoContentBase
      width={690}
      title="Unisciti ad un'organizzazione"
      info={props.info}
      onBack={props.onBack}
    >
      <Grid
        container
        direction="column"
      >
        <Grid
          container
          direction="row"
          alignContent="center"
        >
          <GenericSearchBar
            background={theme.palette.background.paper}
          />
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
        </Grid>
        <Paper className={classes.listContainer}>
          <List>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
            <OrganizationsListItem/>
          </List>
        </Paper>
      </Grid>
    </TitleInfoContentBase>
  );
}

function OrganizationsListItem(){
	const theme = useTheme();

  return(
    <ListItem>
      <ListItemIcon>
        <SchoolRounded/>
      </ListItemIcon>
      <ListItemText
        primary={
          <FlowingText
            background={theme.palette.background.paper}          
          >
            Itis Fermi Modena
          </FlowingText>
        }
      />
      <ListItemSecondaryAction>
        <Button
          variant="outlined"
          color="secondary"
        >
          Unisciti
        </Button>
        <IconButton edge="end" aria-label="delete">
          <ArrowForwardRoundedIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}