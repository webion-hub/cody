import React, { useEffect } from 'react';

import { Grid, IconButton, useTheme, Paper, LinearProgress, Fade, ListItemIcon, Typography, Button } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LaunchRoundedIcon from '@material-ui/icons/LaunchRounded';

import { ListWithVirtualized } from 'src/components/list_with_virtualizer/list_with_virtualizer';
import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';
import { ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import { CustomAvatar } from 'src/components/custom_avatar';

import { User } from 'src/lib/user';
import { getOrganizationKindIcon } from 'src/lib/get_organization_kind_icon';
import { OrganizationLabel } from 'src/components/typography/organization_label';
import { Sad } from 'src/components/illustrations/sad';

import { PageController } from 'src/lib/page_controller';

const useStyles = makeStyles((theme) => ({
  listItemText: {
    maxWidth: 'calc(480px - 140px)',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'calc(100vw - 190px)',
    },
  },
  listItemIcon: {
    marginLeft: theme.spacing(1)
  },
  findOrganizationButton: {
    marginTop: theme.spacing(3)
  },
  findOrganizationContainer: {
    height: `calc(100vh - ${theme.appBar.fullHeight + 16}px)`,
    [theme.breakpoints.down('xs')]: {
      height: "auto",
    },  
  }
}));

export function SideBarOrganizationListDrawerContent() {
  const classes = useStyles();
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
    const organization = organizationsList[index]
    const organizationId = organization.id
    const organizationName = organization.name
    const organizationHasLogo = organization.hasLogo
    const organizationKind = organization.kind

    const organizationImageUrl = `organizations/${organizationId}/logo`

    return (
      <ListItem button ContainerProps={{ style: style }} ContainerComponent="div" key={index}>
        {
          organizationHasLogo ? 
            <ListItemAvatar>
              <CustomAvatar
                src={organizationImageUrl}
                alt={organizationName}
              />
            </ListItemAvatar>
            :
            <ListItemIcon className={classes.listItemIcon}>
              {getOrganizationKindIcon(organizationKind)}
            </ListItemIcon>
        }
        <ListItemText
          className={classes.listItemText}
          primary={<OrganizationLabel organization={organization}/>} 
          primaryTypographyProps={{
            noWrap: true,
            className: classes.listItemText
          }}
        />
        <ListItemSecondaryAction>
          <IconButton
            color="secondary"
          >
            <LaunchRoundedIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  if(noOrganizations)
    return (
      <Grid
        className={classes.findOrganizationContainer}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Sad size="100%"/>
        <Typography variant="h6">
          Non ci sono organizzazioni
        </Typography>
        <Typography variant="subtitle1">
          a cui sei iscritto.
        </Typography>
        <Button
          className={classes.findOrganizationButton}
          variant="outlined"
          color="secondary"
          href='/organization'
          onClick={(event) => PageController.push('/organization', event)}
        >
          Trovane una
        </Button>
      </Grid>
    )

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
          height={mobileView ? 2*window.innerHeight/3  : window.innerHeight - 128}
          width="100%"
          itemSize={46} 
          itemCount={organizationsList.length}
          overscanCount={10}
          getListItem={getListItem}
        />
      </Grid>
    </Paper>
  )
}