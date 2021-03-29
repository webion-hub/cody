import React, { useEffect, useRef } from 'react';
import { useTheme, Grid, Paper, LinearProgress, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core'

import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';

import { JoinOrganizationsListItem } from './components/join_organization_list_item';
import { FilterComponent } from './components/filter_components';
import { useSetOrganizationsSearch } from './hooks/use_set_organizations_search';

import { ListWithScrollUpdater } from 'src/components/list_with_scroll_updater';


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
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  const listRef = useRef();
  
  const elementLoadingLimit = 20;
  const [organizationsSeacrh, setOrganizationsSearch] = useSetOrganizationsSearch(elementLoadingLimit);
  const loading = organizationsSeacrh.loading;
  const offset= organizationsSeacrh.offset;
  const organizations = organizationsSeacrh.organizations;
  const listHeight = mobileView ? 
    window.innerHeight - 244 : 472

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
          <ListWithScrollUpdater
            loading={loading}
            elementLoadingLimit={elementLoadingLimit}
            itemList={organizations}
            offset={offset}
            setItemList={(settings) => {
              const offset = settings.offset;
              const mergeResultWith = settings.mergeResultWith;

              setOrganizationsSearch({
                filter: filterStatus,
                value: searchValue,
                offset: offset,
                mergeResultWith: mergeResultWith,
              })
            }}
            className={classes.list}
            height={listHeight}
            width="100%"
            itemSize={72} 
            overscanCount={10}
            getListItem={(index, style) => {
              return (
                <JoinOrganizationsListItem
                  style={style}
                  key={index}
                  data={organizations[index]}
                  mobileView={mobileView}
                />
              )
            }}
          />
        </Paper>
      </Grid>
    </>
  );
}