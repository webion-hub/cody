import React from 'react';

import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import { School } from 'src/components/illustrations/school';
import { TeamMeeting } from 'src/components/illustrations/team_meeting';
import { TeamWork } from 'src/components/illustrations/team_work';
import { OrganizationsInfoCard } from './components/organization_info_card';


const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.paperSecondary,
    padding: theme.spacing(4),
    maxWidth: 950,
    margin: "0 20%",
    [theme.breakpoints.down('md')]: {
      margin: "0 2%",
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      maxWidth: "100vw",
      margin: "0 auto",
    },
  },
  organizationCardPaper: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
  organizationCardContainer: {
    padding: theme.spacing(2)
  },
  textBoxContainer: {
    width: "calc(100% - 250px)",
    [theme.breakpoints.down('xs')]: {
      width: "100%"
    },
  }
}));

export function useOrganizationsInfoSettings(){
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const appBarHeight = mobileView ? 
    theme.appBar.mobileHeight : theme.appBar.fullHeight

  return {
    component: OrganizationsInfo,
    title: "Info",
    width: "100%",
    height: `calc(100vh - ${appBarHeight}px)`,
    overflow: "auto",
    hideBackButton: true,
    hideInfoButton: true,
  }
}

function OrganizationsInfo(props){
  const classes = useStyles();
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));
 
  return(
    <Grid
      container
      alignItems="center"
      justify="center"
    >
      <Paper className={classes.paper}>
        <Grid
          container
          direction="column"
        >
          <Grid 
            item
            container
          >
            <Typography
              variant={mobileView ? "h4" : "h2"}
              component="h2"
            >
              Cosa sono le organizzazioni?
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
            >
              Le organizzazioni si dividono in Teams, Istituti ed Aziende ognuna di esse può ospitare al loro interno studenti o gruppi di lavoro.<br/>
              Ogni membro dell'organizzazione può unirsi ai corsi all'interno dell'organizzazione in modo da completare lezioni, fare domande sfruttando i threads sul codice, allenarsi con esercizi o pubblicare frammenti di codice.<br/>
              Hai la possibilità di creare una tuo team oppure richiedere l'aggiunta di un istituto scolastico o di un'azienda altrimenti puoi unirti ad una organizzazione già creata. 
            </Typography>
          </Grid>
          <OrganizationsInfoCard
            title="Team"
            description="Pensati per semplici gruppi di persone non associate ad istituti o aziende."
            image={TeamMeeting}
          />
          <OrganizationsInfoCard
            title="Istituti"
            description="Se sei un professore e vuoi creare un ambiente per i tuoi studenti dove possono allenarsi e interagire sul codice gli istuti sono la scelta migliore."
            image={School}
          />
          <OrganizationsInfoCard
            title="Aziende"
            description="Se sei un professore e vuoi creare un ambiente per i tuoi studenti dove possono allenarsi e interagire sul codice gli istuti sono la scelta migliore."
            image={TeamWork}
          />
        </Grid>
      </Paper>
    </Grid>
  );
}