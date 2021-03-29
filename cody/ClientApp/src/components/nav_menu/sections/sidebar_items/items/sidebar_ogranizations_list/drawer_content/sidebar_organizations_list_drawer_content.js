import React, { useEffect } from 'react';

import { Grid, IconButton, useTheme, Paper, LinearProgress, Fade } from '@material-ui/core'
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

const useStyles = makeStyles((theme) => ({
  listItemText: {
    maxWidth: 'calc(480px - 140px)',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'calc(100vw - 190px)',
    },
  }
}));

export function SideBarOrganizationListDrawerContent() {
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const [loading, setLoading] = React.useState(false)
  const [organizationsList, setOrganizationsList] = React.useState([])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      User
       .getJoinedOrganizations()
        .then(organizationsList => setOrganizationsList(organizationsList))
        .finally(() => setLoading(false))
    }, 150);
  }, [])

  const getListItem = (index, style) => {
    const organizations = organizationsList[index]
    const organizationsId = organizations.id
    const organizationImageUrl = `organizations/${organizationsId}/logo`
    const organizationName = organizations.name

    return (
      <ListItem button ContainerProps={{ style: style }} ContainerComponent="div" key={index}>
        <ListItemAvatar>
          <CustomAvatar
            src={organizationImageUrl}
            alt={organizationName}
          />
        </ListItemAvatar>
        <ListItemText
          className={classes.listItemText}
          primary={organizationName} 
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

  return (
    <Paper>
      <Grid
        container
        direction="column"
      >
        <GenericSearchBar/>
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