import React, { useEffect } from 'react';

import { Grid, useTheme, LinearProgress, Fade } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import { ListWithVirtualized } from 'src/components/list_with_virtualizer/list_with_virtualizer';
import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';
import { BookmarkOrganizationListItem } from './bookmark_organization_list_item';

import { User } from 'src/lib/server_calls/user';
import { NoOrganizationFounded } from './no_organization_founded';

export function SideBarOrganizationListDrawerContent() {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const [loading, setLoading] = React.useState(false)
  const [organizationsList, setOrganizationsList] = React.useState([])
  const [noOrganizations, setNoOrganizations] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const [showOnlyBookmarked, setShowOnlyBookmarked] = React.useState(false)

	document.addEventListener('updateUserOrganizations', () => refreshOrganizationList({values: searchValue}))

  useEffect(() => {
    setLoading(true)
    setTimeout(() => 
      refreshOrganizationList({
        value: "",
        onZeroOrganizationsFounded: () => setNoOrganizations(true)
      })
    , 150);

    setOnlyBookmarkedFilter()
  }, [showOnlyBookmarked])

  const setOnlyBookmarkedFilter = () => {
  	document.addEventListener('showOnlyBookmarkedOrganizations', val => {
      setShowOnlyBookmarked(val.detail)
    })
  }

  const refreshOrganizationList = ({value, onZeroOrganizationsFounded}) => {
    if(showOnlyBookmarked){
      User
        .getBookmarkedOrganizations({
          filter: value,
        })
        .then(data => {
          setOrganizationsList(data.values)
        })
        .finally(() => setLoading(false))
      
      return;
    }

    User
      .getJoinedOrganizations({
        filter: value,
      })
      .then(data => {
        setOrganizationsList(data.values)
        if(data.total === 0)
          onZeroOrganizationsFounded?.()
      })
      .finally(() => setLoading(false))
	}


  const handleSearchValue = (value) => {
    setLoading(true)
    setSearchValue(value)
    refreshOrganizationList({value: value})
  }


  const getListItem = (index, style) => {
    const organization = organizationsList[index]
    const isBookmarked = organization.isBookmarked

    return (
      <BookmarkOrganizationListItem
        organization={organization}
        isBookmarked={isBookmarked}
        style={style}
        index={index}
      />
    )
  }

  if(noOrganizations)
    return <NoOrganizationFounded/>

  return (
    <>
      <Grid
        container
        direction="column"
      >
        <GenericSearchBar
            onChange={handleSearchValue}
        />
        <Fade in={loading}>
          <LinearProgress color="secondary" />
        </Fade>
        <ListWithVirtualized 
          height={mobileView ? window.innerHeight - 68 : window.innerHeight - 128}
          width="100%"
          itemSize={56} 
          itemCount={organizationsList.length}
          overscanCount={10}
          getListItem={getListItem}
        />
      </Grid>
    </>
  )
}