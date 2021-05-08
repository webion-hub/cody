import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Grid } from "@material-ui/core";
import { GenericSearchBar } from "src/components/pickers/search_bars/generic_search_bar/generic_search_bar";
import { OrganizationContext } from "../../organization_controller_context";
import { CourseAccordion } from "src/components/accordions/course_accordion/course_accordion";
import { MobileCoursesButtons } from "./components/mobile_courses_buttons";
import { CoursesButtons } from "./components/courses_buttons";
import { CreateCourseDialog } from "./components/create_course_dialog/create_course_dialog";
import { useMobileView } from "src/lib/hooks/use_mobile_view";

const useStyles = makeStyles((theme) => ({
	coursesBox: {
		paddingTop: theme.spacing(6),
    padding: theme.spacing(2)
	},
	coursesTitle: {
    position: "relative",
    [theme.breakpoints.down('xs')]: {
      maxWidth: `calc(100vw - ${theme.spacing(4)}px)`
    },
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
  availableCourses: {
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      textAlign: "center",
      marginBottom: theme.spacing(1)
    },
  }
}));

export function OrganizationCourses(){
	const classes = useStyles();
  const mobileView = useMobileView()

  const [showSearchBar, setShowSearchBar] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)

	const {
    callerIs,
		loading,
	} = React.useContext(OrganizationContext);

  return (
    <>
      <div className={classes.coursesBox}>
        <Grid
          className={classes.coursesTitle}
          container
          direction="row"
          alignItems="center"
        >
          <Typography
            className={classes.availableCourses}        
            variant={mobileView ? "h5" : "h4"}
            noWrap
          >
            Corsi Disponibili
          </Typography>
          <CoursesButtons
            onShowSearch={_ => setShowSearchBar(!showSearchBar)}
            onAddCourse={_ => setOpenDialog(true)}
            showSearchBar={showSearchBar}
            callerIs={callerIs}
          />
        </Grid>
        <GenericSearchBar className={`${classes.searchBar} ${showSearchBar ? "" : classes.hideSearchBar}`}/>
        <MobileCoursesButtons
          onShowSearch={_ => setShowSearchBar(!showSearchBar)}
          onAddCourse={_ => setOpenDialog(true)}
          showSearchBar={showSearchBar}
          callerIs={callerIs}
        />
        <CourseAccordion
          firstAccordion
          loading={loading}
          title="Corso base Python"
          description="Il corso è pensato e strutturato per essere godibile anche da non tecnici, ovvero da persone che si stanno avvicinando per la prima volta al mondo della programmazione, e per questo motivo tra gli argomenti trattati nella serie ci sono anche degli accenni ai concetti di Algoritmo, Diagramma di Flusso e Logica Booleana."
          teachers={["Valente", "Bassoli", "Mandreoli"]}
        />
        <CourseAccordion
          loading={loading}
          title="Corso Java"
          description="Il corso è pensato e strutturato per essere godibile anche da non tecnici, ovvero da persone che si stanno avvicinando per la prima volta al mondo della programmazione, e per questo motivo tra gli argomenti trattati nella serie ci sono anche degli accenni ai concetti di Algoritmo, Diagramma di Flusso e Logica Booleana."
          teachers={["Bedogni"]}
        />
      </div>
      <CreateCourseDialog
        open={openDialog}
        onClose={_ => setOpenDialog(false)}
      />
    </>
  );
}