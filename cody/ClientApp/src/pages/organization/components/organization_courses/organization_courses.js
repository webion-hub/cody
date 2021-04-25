import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { Grid } from "@material-ui/core";
import { GenericSearchBar } from "src/components/pickers/search_bars/generic_search_bar/generic_search_bar";
import { OrganizationContext } from "../../organization_controller_context";
import { CourseAccordion } from "src/components/accordions/course_accordion/course_accordion";
import { MobileCoursesButtons } from "./components/mobile_courses_buttons";
import { CoursesButtons } from "./components/courses_buttons";
import { DialogBase } from "src/components/bases/dialog_base";
import { CustomStepper } from "src/components/stepper/custom_stepper/custom_stepper";
import { BasePhotoText } from "src/components/bases/base_photo_text";
import { Step1 } from "src/components/illustrations/step1";
import { Teacher } from "src/components/illustrations/teacher";
import { School } from "src/components/illustrations/school";
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AutocompleteWithVirtualizer } from "src/components/autocomplete_with_virtualizer/autocomplete_with_virtualizer";

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
  },
  dialogContent: {
    padding: 0,
  },
  dialogPaper: {
    maxWidth: 616,
    width: "100%"
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  teachersAutocomplete: {
    marginTop: theme.spacing(1)
  },
  nameTextField: {
    marginTop: theme.spacing(1)
  }
}));

export default function OrganizationPage(){
	const classes = useStyles();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const [users, setUsers] = React.useState([])
  const [showSearchBar, setShowSearchBar] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)

	const {
    callerIs,
		loading,
    organization
	} = React.useContext(OrganizationContext);

  useEffect(() => {
    organization
      .getMembers()
      .then(data => setUsers(data.values))
  }, [])

  return (
    <AccordionDetails>
      <div className={classes.coursesBox}>
        <Grid
          className={classes.coursesTitle}
          container
          direction="row"
          alignItems="center"
        >
          <Typography
            className={classes.availableCourses}        
            variant={mobileView ? "h4" : "h4"}
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
      <DialogBase
        className={classes.dialogContent}
        paperClassName={classes.dialogPaper}
        open={openDialog}
        onClose={_ => setOpenDialog(false)}
      >
        <CustomStepper
          onBackFirstPage={_ => setOpenDialog(false)}
          firstPageLabel="Chiudi"
          component={Box}
          elements={[
            {
              element: 
                <BasePhotoText image={School}>
                  <Typography>
                    Dai un nome al corso
                  </Typography>
                  <TextField
                    className={classes.nameTextField}
                    color="secondary" 
                    label="Nome corso" 
                    fullWidth 
                    variant="outlined"
                    required
                  />
                  <TextField
                    className={classes.description}
                    label="Descrizione corso" 
                    multiline
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    rows={6}
                  />
                </BasePhotoText>,
              height: 411
            },
            {
              element: 
                <BasePhotoText image={Teacher}>
                  <Typography>
                    Seleziona i Professori
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="caption"
                  >
                    per questo corso
                  </Typography>
                  {/*sostituisci con Enhanced Transfer List https://material-ui.com/components/transfer-list/ */}
                  <AutocompleteWithVirtualizer
                    heightbig={45}
                    heightsmall={50}
                    limitTags={3}
                    className={classes.teachersAutocomplete}
                    multiple
                    fullWidth
                    options={users}
                    getOptionLabel={(option) => option.username}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Utenti"
                        color="secondary"
                      />
                    )}
                  />
                </BasePhotoText>,
              height: 365
            },
          ]}
        />
      </DialogBase>
    </AccordionDetails>
  );
}