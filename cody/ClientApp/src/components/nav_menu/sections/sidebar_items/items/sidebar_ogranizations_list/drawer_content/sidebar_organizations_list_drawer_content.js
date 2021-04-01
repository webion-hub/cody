import React, { useEffect } from 'react';

import { Grid, useTheme, Paper, LinearProgress, Fade } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import { ListWithVirtualized } from 'src/components/list_with_virtualizer/list_with_virtualizer';
import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';
import { BookmarkOrganizationListItem } from './bookmark_organization_list_item';

import { User } from 'src/lib/user';
import { NoOrganizationFounded } from './no_organization_founded';

export function SideBarOrganizationListDrawerContent() {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const [loading, setLoading] = React.useState(false)
  const [organizationsList, setOrganizationsList] = React.useState([])
  const [noOrganizations, setNoOrganizations] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

	document.addEventListener('updateUserOrganizations', () => refreshOrganizationList(searchValue))

  useEffect(() => {
    setLoading(true)
    setTimeout(() => 
      refreshOrganizationList(
        "", () => setNoOrganizations(true)
      )
    , 150);
  }, [])

  const refreshOrganizationList = (value, onZeroOrganizationsFounded) => {
    User
      .getJoinedOrganizations({
        filter: value,
      })
      .then(data => {
        console.log(data.values)
        setOrganizationsList(data.values)
        if(data.total === 0)
          onZeroOrganizationsFounded?.()
      })
      .finally(() => setLoading(false))
	}


  const handleSearchValue = (value) => {
    setLoading(true)
    setSearchValue(value)
    refreshOrganizationList(value)
  }


  const getListItem = (index, style) => {
    return (
      <BookmarkOrganizationListItem
        organization={organizationsList[index]}
        style={style}
        index={index}
        isSaved={false}
        onIsSavedChange={(isSaved) => console.log(isSaved)}
      />
    )
  }

  if(noOrganizations)
    return <NoOrganizationFounded/>

  return (
    <Paper>
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
    </Paper>
  )
}