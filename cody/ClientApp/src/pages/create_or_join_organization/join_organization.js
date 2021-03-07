import React, { useRef, useLayoutEffect } from 'react';
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
    overflow: "auto",
    height: 280,
    [theme.breakpoints.down('xs')]: {
      height: "calc(100vh - 220px)",
    },
  },
  searchBar: {
    width: "calc(100% - 174px)",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      maxWidth: "calc(100vw - 16px)"
    },
  }
}));

export function JoinOrganization(props){
	const theme = useTheme();
  const classes = useStyles();
  const listRef = useRef();
  const [maxListItemWidth, setMaxListItemWidth] = React.useState(0);
  const [filterStatus, setFilterStatus] = React.useState({
    teams: true,
    schools: true,
    companies: true,
  });

  useLayoutEffect(() => {
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);

  }, []);
	
  const updateWidth = () => {
    if(listRef !== null){
      setMaxListItemWidth(
        listRef.current.offsetWidth - 220
      );
    }

	}

  const handleFilter = (filter) => {
    setFilterStatus({
      ...filterStatus,
      [filter]: !filterStatus[filter]
    })
  }

  return(
    <>
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
            className={classes.searchBar}
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
          <List ref={listRef}>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
            <OrganizationsListItem maxListItemWidth={maxListItemWidth}/>
          </List>
        </Paper>
      </Grid>
    </>
  );
}

function OrganizationsListItem(props){
	const theme = useTheme();

  return(
    <ListItem>  
      <ListItemIcon>
        <SchoolRounded/>
      </ListItemIcon>
      <ListItemText
        primary={
          <FlowingText
            containerWidth={props.maxListItemWidth}
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