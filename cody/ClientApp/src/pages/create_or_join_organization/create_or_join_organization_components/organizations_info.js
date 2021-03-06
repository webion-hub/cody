import React from 'react';

import { Grid, IconButton, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';

import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';

import { Question } from 'src/components/illustrations/question';


const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minHeight: "100vh",
    position: "relative",
    background: theme.palette.background.backgroundTransparent,
    paddingTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0,
    },
  },
  scrollTop: {
    margin: "0 auto"
  },
  listContainer: {
    width: "auto",
    padding: "0 20%",
    [theme.breakpoints.down('xs')]: {
      padding: "0 10%",
    },
  },
  infoTitle: {
    width: "60%",
    margin: "0 auto",
    [theme.breakpoints.down('xs')]: {
      width: "80%",
    },
  },
  list: {
    listStyleType: "none",
    width: "65%",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
    },
    padding: 0,
    "& li": {
      marginTop: theme.spacing(2),
      "& .description": {
        marginLeft: theme.spacing(6)
      }
    }
  },
  image: {
    position: "absolute",
    width: "50%",
    maxWidth: 1000,
    zIndex: -1,
    bottom: 0,
    right: 0,
  }
}));

export function OrganizationsInfo(props){
  const classes = useStyles();
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
 
  return(
		<Grid
      ref={props.innerRef}
      className={classes.pageContainer}
			container
      direction="column"
		>
      <div className={classes.scrollTop}>
        <IconButton onClick={scrollTop}>
          <KeyboardArrowUpRoundedIcon/>
        </IconButton>
      </div>
      {
        mobileView ? 
          <Question size="100vw"/>
          :
          null
      }
      <div
        className={classes.infoTitle}
      >
        <Typography
          variant={mobileView ? "h4" : "h2"}
          component="h2"
        >
          Cosa sono le organizzazioni?
        </Typography>
      </div>
      <div className={classes.listContainer}>
        <Typography
          variant="body1"
          color="textSecondary"
        >
          Le organizzazioni si dividono in Teams, Istituti ed Aziende ognuna di esse può ospitare al loro interno studenti o gruppi di lavoro.<br/>
          Ogni membro dell'organizzazione può unirsi ai corsi all'interno dell'organizzazione in modo da completare lezioni, fare domande sfruttando i threads sul codice, allenarsi con esercizi o pubblicare frammenti di codice.<br/>
          Hai la possibilità di creare una tuo team oppure richiedere l'aggiunta di un istituto scolastico o di un'azienda altrimenti puoi unirti ad una organizzazione già creata. 
        </Typography>
        <ul className={classes.list}>
          <li>
            <TitleDescription
              title="Teams"
              icon={GroupRoundedIcon}
            >
              Pensati per semplici gruppi di persone non associate ad istituti o aziende.
            </TitleDescription>
          </li>
          <li>
            <TitleDescription
              title="Istituti"
              icon={SchoolRoundedIcon}
            >
              Se sei un professore e vuoi creare un ambiente per i tuoi studenti dove possono allenarsi e interagire sul codice gli istuti sono la scelta migliore.
            </TitleDescription>
          </li>
          <li>
            <TitleDescription
              title="Aziende"
              icon={BusinessCenterRoundedIcon}
            >
              Per compagnie con intenti di divulgazione o commerciali.
            </TitleDescription>
          </li>
        </ul>
      </div>
      {
        mobileView ? 
          null
          :
          <div className={classes.image}>
            <Question/>
          </div>
      }
    </Grid>
  );
}


function TitleDescription(props){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  return(
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
      >
        <props.icon fontSize="large" style={{marginRight: 8}}/>
        <Typography
          variant={mobileView ? "h5" : "h4"}
          component="h3"
        >
          {props.title}
        </Typography>
      </Grid>      
      <Typography
        className="description"
        variant="body1"
        color="textSecondary"
      >
        {props.children}
      </Typography>
    </>
  )
}
