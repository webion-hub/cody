import React from 'react';

import { Grid, IconButton } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import { TeamMeeting } from 'src/components/illustrations/team_meeting';
import { NewOrganization } from 'src/components/illustrations/new_oraganization';
import { OrganizationAction } from 'src/pages/create_or_join_organization/organization_action';
import { OrganizationsInfo } from 'src/pages/create_or_join_organization/organizations_info';
import { BackgroundWithLines } from 'src/components/background_with_lines';

import InfoRounded from '@material-ui/icons/InfoRounded';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minHeight: "100vh",
    position: "relative",
  },
  paperBox: {
    position: "relative",
    maxWidth: 750,
    width: "100%",
    background: theme.palette.background.paperSecondary,
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
    },
  },
  title: {
    textAlign: "center",
  },
  titleContainer: {
    width: "100%",
    padding: theme.spacing(1),
    background: theme.palette.background.backgroundTransparent,
  },
  cardContainer: {
    padding: theme.spacing(1),
  },
  infoButton: {
    position: "absolute",
    right: 0
  },
  showInfo: {
    textAlign: "center",
  }
}));

export function CreateOrJoinOrganization(){
  const classes = useStyles();
  const infoRef = React.createRef();

  const scrollToInfo = () => {
    infoRef.current.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  return(
    <>
      <Grid
        className={classes.pageContainer}
        container
        justify="center"
        alignItems="center"
      >
        <Paper className={classes.paperBox}>
          <Grid
            container
            direction="column"
            alignItems="center"
          >
            <Grid
              className={classes.titleContainer}
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Typography
                className={classes.title}
                variant="h5"
                component="h1"
              >
                Unisciti o crea un'organizzazione
              </Typography>
              <IconButton 
                className={classes.infoButton}
                onClick={scrollToInfo}
              >
                <InfoRounded/>
              </IconButton>
            </Grid>

            <Grid
              container
              direction="row"
              className={classes.cardContainer}
            >
              <OrganizationAction
                image={NewOrganization}
                buttonLabel="Crea"
                endIcon={<ArrowForwardRoundedIcon/>}
                onClick={() => {}}
              />
              <OrganizationAction
                image={TeamMeeting}
                buttonLabel="Unisciti"
                endIcon={<ArrowForwardRoundedIcon/>}
                onClick={() => {}}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <OrganizationsInfo
        innerRef={infoRef}
      />
      <BackgroundWithLines 
        height={1}
      /> 
    </>

  );
}