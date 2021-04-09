import React, { useEffect } from 'react';
import { useTheme, Grid, Paper, LinearProgress, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core'

import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';
import { ListWithScrollUpdater } from 'src/components/list_with_search/component/list_with_scroll_updater';
import { useListWithSearch } from './hook/use_list_with_search';
import { NoDataFounded } from './component/no_data_founded';

const useStyles = makeStyles((theme) => ({
  listContainer: props => ({
    height: props.listHeight,
    marginTop: theme.spacing(1),
    background: theme.palette.background.paperSecondary,
    transition: "0.25s height"
  }),
  list: {
    overflow: "overlay",
  },
  searchBarStyle: props => ({
    maxWidth: `calc(100% - ${props.filterComponentWidth}px)`,
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      maxWidth: "calc(100vw - 16px) !important"
    },
  }),
  filterComponent: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    },
  },
  linearProgress: {
    marginTop: theme.spacing(0.5),
    borderRadius: 2
  }
}));

export function ListWithSearch(props){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));
  const filterComponentRef = React.useRef();
  const filterComponentWidth = filterComponentRef.current
    ? filterComponentRef.current.offsetWidth + 16
    : 0
  const listHeight = mobileView 
    ? props.listMobileHeight 
    : props.listHeight

  const classes = useStyles({filterComponentWidth, listHeight});
  const {
    handleScrollEnd,
    setSearchValue,
    searchValue,
    loading,
    dataList
  } = useListWithSearch(props)

  const totalLoading = loading.mainLoading || loading.searchLoading

  useEffect(() => {
    if(props.cleanOnFilterChange)
      setSearchValue("")
  }, [props.filter])  
  

  return(
    <Grid
      className={props.className}
      container
      direction="column"
    >
      <Grid
        container
        direction="row"
        alignContent="center"
      >
        <GenericSearchBar
          className={classes.searchBarStyle}
          background={theme.palette.background.paperSecondary}
          onChange={setSearchValue}
          value={searchValue}
        />
        {
          React.Children.map(props.filterComponent, (child, index) => {
            return React.cloneElement(child, {
              ref: filterComponentRef, 
              key: index,
              className: classes.filterComponent
            });
          })
        }
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
        {
          dataList?.values.length === 0 ?
            <NoDataFounded 
              {...props.noDataFoundedProps}
              loading={totalLoading}
            />
            :
            <ListWithScrollUpdater
              loading={loading.searchLoading}
              itemList={dataList?.values}
              onScrollEnd={handleScrollEnd}
              className={classes.list}
              height={listHeight}
              width={props.width}
              itemSize={props.itemSize} 
              overscanCount={10}
              getListItem={(index, style) => {
                return (
                  <props.listItem
                    style={style}
                    key={index}
                    data={dataList?.values[index]}
                    mobileView={mobileView}
                  />
                )
              }}
            />
        }

      </Paper>
    </Grid>
  );
}