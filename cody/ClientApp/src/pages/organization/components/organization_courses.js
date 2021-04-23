import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import { Grid, IconButton } from "@material-ui/core";
import { GenericSearchBar } from "src/components/pickers/search_bars/generic_search_bar/generic_search_bar";
import { CourseAccordion } from "src/components/course_accordion";

const useStyles = makeStyles((theme) => ({
	coursesBox: {
		paddingTop: theme.spacing(6),
    padding: theme.spacing(2)
	},
	coursesTitle: {
    position: "relative",
		marginBottom: theme.spacing(2)
	},
  searchIcon: {
    fontSize: 28
  },
  searchBar: {
    marginBottom: theme.spacing(2),
    transition: "0.25s all"
  },
  hideSearchBar: {
    marginTop: -64,
    opacity: 0,
    pointerEvents: "none"
  },
}));

export default function OrganizationPage(){
	const classes = useStyles();
  const [showSearchBar, setShowSearchBar] = React.useState(false)

  return (
    <div className={classes.coursesBox}>
      <Grid
        className={classes.coursesTitle}
        container
        direction="row"
        alignItems="center"
      >
        <Typography          
          variant="h4"
          noWrap
        >
          Corsi Disponibili
        </Typography>
        <IconButton          
          onClick={_ => setShowSearchBar(!showSearchBar)}
        >
          {
            showSearchBar ? 
              <CloseRoundedIcon className={classes.searchIcon}/>
              :
              <SearchRoundedIcon className={classes.searchIcon}/>
          }          
        </IconButton>
      </Grid>
      <GenericSearchBar className={`${classes.searchBar} ${showSearchBar ? "" : classes.hideSearchBar}`}/>
      <CourseAccordion
        firstAccordion
        title="Corso base Python"
        description="Il corso è pensato e strutturato per essere godibile anche da non tecnici, ovvero da persone che si stanno avvicinando per la prima volta al mondo della programmazione, e per questo motivo tra gli argomenti trattati nella serie ci sono anche degli accenni ai concetti di Algoritmo, Diagramma di Flusso e Logica Booleana."
        teachers={["Valente", "Bassoli", "Mandreoli"]}
      />
      <CourseAccordion
        title="Corso Java"
        description="Il corso è pensato e strutturato per essere godibile anche da non tecnici, ovvero da persone che si stanno avvicinando per la prima volta al mondo della programmazione, e per questo motivo tra gli argomenti trattati nella serie ci sono anche degli accenni ai concetti di Algoritmo, Diagramma di Flusso e Logica Booleana."
        teachers={["Bedogni"]}
      />
    </div>
  );
}