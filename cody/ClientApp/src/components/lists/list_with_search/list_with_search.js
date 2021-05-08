import React, { useEffect, useRef } from 'react';
import { useTheme, Grid, Paper, LinearProgress, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';
import { ListWithScrollUpdater } from 'src/components/lists/list_with_search/component/list_with_scroll_updater';
import { useListWithSearch } from './hook/use_list_with_search';
import { NoDataFound } from './component/no_data_found';
import { useMobileView } from 'src/lib/hooks/use_mobile_view';

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
      marginLeft: 0,
      marginTop: theme.spacing(2)
    },
  },
  linearProgress: {
    marginTop: theme.spacing(0.5),
    borderRadius: 2
  }
}));


export const ListWithSearch = React.memo((props) => {
  const filterComponentRef = useRef();
  const theme = useTheme();
  const mobileView = useMobileView();
  
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
      <Paper className={`${classes.listContainer} ${props.paperClassName ? props.paperClassName : ""}`}>
        {
          dataList?.total === 0 ?
            <NoDataFound 
              {...props.noDataFoundProps}
              loading={totalLoading}
            />
            :
            <ListWithScrollUpdater
              loading={loading.searchLoading}
              itemData={dataList?.values}
              onScrollEnd={handleScrollEnd}
              className={classes.list}
              height={listHeight}
              width={props.width}
              itemSize={props.itemSize} 
              overscanCount={10}
              listItemProps={props.listItemProps}
              getListItem={(index, style, data, listItemProps) => {
                return (
                  <props.listItem
                    style={style}
                    key={index}
                    data={data}
                    mobileView={mobileView}
                    {...listItemProps}
                  />
                )
              }}
            />
        }
      </Paper>
    </Grid>
  );
}, (prevProps, nextProps) => {
  if(prevProps.listItemProps !== nextProps.listItemProps)
    return true

  return false
})