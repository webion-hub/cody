import React, { useEffect, useRef } from 'react';
import { useTheme, Grid, List, Paper, LinearProgress, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';

import { JoinOrganizationsListItem } from './components/join_organization_list_item';
import { FilterComponent } from './components/filter_components';
import { useSetOrganizationsSearch } from './hooks/use_set_organizations_value';

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
    background: theme.palette.background.paperSecondary
  },
  list: {
    overflow: "overlay",
    height: 472,
    [theme.breakpoints.down('xs')]: {
      height: "calc(100vh - 244px)",
    },
  },
  searchBar: {
    maxWidth: "calc(100% - 174px) !important",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      maxWidth: "calc(100vw - 16px) !important"
    },
  },
  linearProgress: {
    marginTop: theme.spacing(0.5),
    borderRadius: 2
  }
}));

export const joinOrganizationSettings = {
  component: JoinOrganization,
  title: "Unisciti ad un'organizzazione",
  width: 750,
  height: 616,
}

function JoinOrganization(){
	const theme = useTheme();
  const classes = useStyles();
  const listRef = useRef();
  
  const elementLoadingLimit = 20;
  const [organizationsSeacrh, setOrganizationsSearch] = useSetOrganizationsSearch(elementLoadingLimit);
  const loading = organizationsSeacrh.loading;
  const offset= organizationsSeacrh.offset;
  const organizations = organizationsSeacrh.organizations;

  const [searchValue, setSearchValue] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState({
    teams: true,
    schools: true,
    companies: true,
  });

  useEffect(() => {
    setOrganizationsSearch({
      filter: filterStatus,
      value: "",
      offset: 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goTop = () => {
    listRef.current.scrollTo({top: 0, behavior: 'smooth'})
  }

  const handleFilter = (filter) => {
    const filterValues = {
      ...filterStatus,
      [filter]: !filterStatus[filter]
    }
    setFilterStatus(filterValues)

    goTop()
    setOrganizationsSearch({
      filter: filterValues,
      value: searchValue,
      offset: 0,
    })    
  }

  const handleSearchValue = (value) => {
    setSearchValue(value);

    setOrganizationsSearch({
      filter: filterStatus,
      value: value,
      offset: 0,
    })
  }

  const handleScroll = () => {
    const scrollPosition = 
      listRef.current.offsetHeight + listRef.current.scrollTop;
    const scrollHeight = listRef.current.scrollHeight;
    const isScrollAtTheEnd = scrollPosition + 250 >= scrollHeight

    if(isScrollAtTheEnd){
      const areOtherElements = 
        organizations.length % elementLoadingLimit === 0

      if(areOtherElements && !loading){
        const newOffsetVal = offset + elementLoadingLimit
        setOrganizationsSearch({
          filter: filterStatus,
          value: searchValue,
          offset: newOffsetVal,
          mergeResultWith: organizations,
        })
      }
    }
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
            background={theme.palette.background.paperSecondary}
            onChange={handleSearchValue}
          />
          <FilterComponent
            setFilter={handleFilter}
            filterStatus={filterStatus}
          />
        </Grid>
        <Fade
          in={loading}
        >
          <LinearProgress 
            color="secondary"
            className={classes.linearProgress}
          />
        </Fade>
        <Paper className={classes.listContainer}>
          <List 
            ref={listRef}
            className={classes.list}
            onScroll={handleScroll}
          >
            {
              organizations.map((element, index) => (
                <JoinOrganizationsListItem
                  key={index}
                  data={element}
                />
              ))
            }
          </List>
        </Paper>
      </Grid>
    </>
  );
}