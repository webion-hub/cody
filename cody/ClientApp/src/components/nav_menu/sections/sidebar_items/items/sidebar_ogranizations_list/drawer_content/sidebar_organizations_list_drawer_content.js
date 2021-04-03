import React from 'react';

import { Grid, useTheme, LinearProgress, Fade } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import { ListWithVirtualized } from 'src/components/list_with_virtualizer/list_with_virtualizer';
import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';
import { BookmarkOrganizationListItem } from './bookmark_organization_list_item';

import { NoOrganizationFounded } from './no_organization_founded';
import { getJoinedOrganizations } from './lib/get_joined_organizations';

export function SideBarOrganizationListDrawerContent() {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const [loading, setLoading] = React.useState(false)
  const [organizationsList, setOrganizationsList] = React.useState([])
  const [noOrganizations, setNoOrganizations] = React.useState("notShowMessage")
  const [searchValue, setSearchValue] = React.useState("")

  document.addEventListener('drawerOrganizationsFilterEvent', val => {
    refreshOrganizationList({
      searchValue: "",
      onZeroOrganizationsFounded: () => {
        if(val.detail === "showOnlyBookmarked")
          setNoOrganizations("showNoBookmarkedOrganizations")
        else
          setNoOrganizations("showNoOrganizations")
      },
      showOnlyBookmarked: val.detail
    })
  })

  const refreshOrganizationList = ({searchValue, onZeroOrganizationsFounded, showOnlyBookmarked}) => {
    setLoading(true)

    getJoinedOrganizations({
      searchValue: searchValue,
      showOnlyBookmarked: showOnlyBookmarked,
    })
    .then(data => {
      setOrganizationsList(data.values)
      if(data.total === 0)
        onZeroOrganizationsFounded?.()
    })
    .finally(() => setLoading(false))
	}

  const handleSearchValue = (searchValue) => {
    setLoading(true)
    setSearchValue(searchValue)
    refreshOrganizationList({searchValue: searchValue})
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

  if(noOrganizations !== "notShowMessage")
    return <NoOrganizationFounded messageType={noOrganizations}/>

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