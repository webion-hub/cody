import React, { useEffect } from 'react';
import { useTheme, Grid, Paper, LinearProgress, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core'

import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';

import { JoinOrganizationsListItem } from './components/join_organization_list_item';
import { FilterComponent } from './components/filter_components';
import { getOrganizationFilter } from './lib/get_organization_filter';

import { ListWithScrollUpdater } from 'src/components/list_with_scroll_updater';
import { Organizations } from 'src/lib/server_calls/organizations';


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
  const classes = useStyles();
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));
  
  const listHeight = mobileView ? 
    window.innerHeight - 244 : 472

  const offsetStep = 25;
  const [offset, setOffset] = React.useState(0);
  const [loading, setLoading] = React.useState({
    mainLoading: false,
    searchLoading: false,
  });
  const totalLoading = loading.mainLoading || loading.searchLoading

  const [searchValue, setSearchValue] = React.useState("");
  const [organizationList, setOrganizationList] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.useState({
    teams: true,
    schools: true,
    companies: true,
  });

  const listAllOrganizations = (setOrganizationList) => {
    const listAllOrganizationsFilter = `${getOrganizationFilter(filterStatus)} ${searchValue}`

    return Organizations.listAll({
      filter: listAllOrganizationsFilter,
      limit: offsetStep,
      offset: offset,
    })
    .then(searchResults => setOrganizationList(searchResults.values))
    .finally(_=> {
      setLoading({
        mainLoading: false,
        searchLoading: false
      })
    })
  }

  useEffect(() => {
    setLoading({
      mainLoading: true,
      searchLoading: true
    })

    listAllOrganizations(setOrganizationList)
  }, [searchValue, filterStatus])

  useEffect(() => {
    if(offset === 0)
      return;
      
    setLoading({
      mainLoading: true,
      searchLoading: false
    })

    listAllOrganizations(mergeResultWith)
  }, [offset])

  const handleFilter = (filter) => {
    const filterValues = {
      ...filterStatus,
      [filter]: !filterStatus[filter]
    }
    setFilterStatus(filterValues)
    setOffset(0)
  }

  const handleSearchValue = (value) => {
    setSearchValue(value);
    setOffset(0)
  }

  const handleScrollEnd = () => {
    if(totalLoading)
      return;
      
    const newOffset = offsetStep + offset;
    setOffset(newOffset)  
  }

  const mergeResultWith = (newOrganizationList) => {
    const completeOrganizationList = organizationList.concat(newOrganizationList)
    setOrganizationList(completeOrganizationList)
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
          in={totalLoading}
        >
          <LinearProgress 
            color="secondary"
            className={classes.linearProgress}
          />
        </Fade>
        <Paper className={classes.listContainer}>
          <ListWithScrollUpdater
            loading={loading.searchLoading}
            itemList={organizationList}
            onScrollEnd={handleScrollEnd}
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
                  data={organizationList[index]}
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