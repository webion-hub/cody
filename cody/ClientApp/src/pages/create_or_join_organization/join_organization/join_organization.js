import React, { useEffect, useRef } from 'react';
import { useTheme, Grid, List, Paper, LinearProgress, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { GenericSearchBar } from 'src/components/pickers/search_bar/generic_search_bar';

import { OrganizationsListItem } from './organization_list_item';
import { FilterComponent } from './filter_components';

import { useGetSize } from 'src/lib/hooks/use_get_size';
import { useSetOrganizationsValue } from './use_set_organizations_value';

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
  },
  list: {
    overflow: "overlay",
    height: 272,
    [theme.breakpoints.down('xs')]: {
      height: "calc(100vh - 228px)",
    },
  },
  searchBar: {
    maxWidth: "calc(100% - 174px)",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      maxWidth: "calc(100vw - 16px)"
    },
  },
  linearProgress: {
    marginTop: theme.spacing(0.5),
    borderRadius: 2
  }
}));

export function JoinOrganization(props){
	const theme = useTheme();
  const classes = useStyles();
  const listRef = useRef();
  
  const maxListItemWidth = useGetSize(listRef).width - 210;

  const elementLoadingLimit = 20;
  const [organizationsValues, setOrganizationsValue] = useSetOrganizationsValue(elementLoadingLimit);
  const loading = organizationsValues.loading;
  const offset= organizationsValues.offset;
  const organizations = organizationsValues.organizations;

  const [searchValue, setSearchValue] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState({
    teams: true,
    schools: true,
    companies: true,
  });

  useEffect(() => {
    setOrganizationsValue({
      filter: filterStatus,
      value: "",
      offset: 0,
    })
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
    setOrganizationsValue({
      filter: filterValues,
      value: searchValue,
      offset: 0,
    })    
  }

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSubmit = () => {
    goTop()
    setOrganizationsValue({
      filter: filterStatus,
      value: searchValue,
      offset: 0,
    })
  }

  const handleScroll = () => {
    const scrollPosition = 
      listRef.current.offsetHeight + listRef.current.scrollTop;
    const scrollHeight = listRef.current.scrollHeight;
    const isScrollAtTheEnd = scrollPosition >= scrollHeight

    if(isScrollAtTheEnd){
      const areOtherElements = 
        organizations.length % elementLoadingLimit === 0

      if(areOtherElements && !loading){
        const newOffsetVal = offset + elementLoadingLimit
        setOrganizationsValue({
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
            background={theme.palette.background.paper}
            onChange={handleSearchValue}
            onSubmit={handleSubmit}
          />
          <FilterComponent
            handleFilter={handleFilter}
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
                <OrganizationsListItem
                  key={index}
                  maxListItemWidth={maxListItemWidth}
                  kind={element.kind}
                  name={element.name}
                  city={element.detail.city}
                  country={element.detail.country}
                />
              ))
            }
          </List>
        </Paper>
      </Grid>
    </>
  );
}