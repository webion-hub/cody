import React, { useEffect } from 'react';

import { Grid, useTheme, LinearProgress, Fade } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import { ListWithVirtualized } from 'src/components/list_with_virtualizer/list_with_virtualizer';
import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';
import { BookmarkOrganizationListItem } from './components/bookmark_organization_list_item';

import { NoOrganizationFounded } from './components/no_organization_founded';
import { getJoinedOrganizations } from './lib/get_joined_organizations';

export function SideBarOrganizationListDrawerContent() {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const [loading, setLoading] = React.useState(false)
  const [filter, setFilter] = React.useState("waiting")
  const [searchValue, setSearchValue] = React.useState("")
  const [organizationsList, setOrganizationsList] = React.useState([])

  const noOrganizationFounded = organizationsList.length === 0

  document.addEventListener('drawerFilterState', val => {
    setSearchValue("")
    setFilter(val.detail)
  })

  useEffect(() => {
    refreshOrganizationList()
  }, [searchValue, filter])

  const refreshOrganizationList = () => {
    if(filter === "waiting")
      return

    setLoading(true)

    getJoinedOrganizations({
      searchValue: searchValue,
      showOnlyBookmarked: filter === "onlyBookmarked",
    })
    .then(data => setOrganizationsList(data.values))
    .finally(() => setLoading(false))
	}

  const handleSearchValue = (searchValue) => {
    setSearchValue(searchValue)
    setLoading(true)
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

  return (
    <>
      <Grid
        container
        direction="column"
      >
        <GenericSearchBar
          onChange={handleSearchValue}
          value={searchValue}
        />
        <Fade in={loading}>
          <LinearProgress color="secondary" />
        </Fade>
        {
          noOrganizationFounded ? 
            <NoOrganizationFounded loading={loading}/>
            :            
            <ListWithVirtualized 
              loading={loading}
              height={mobileView ? window.innerHeight - 68 : window.innerHeight - 128}
              width="100%"
              itemSize={56} 
              itemCount={organizationsList.length}
              overscanCount={10}
              getListItem={getListItem}
            />
        }
      </Grid>
    </>
  )
}