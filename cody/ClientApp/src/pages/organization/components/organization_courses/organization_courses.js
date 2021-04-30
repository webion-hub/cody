import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Checkbox, TextField, useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

import { Grid } from "@material-ui/core";
import { GenericSearchBar } from "src/components/pickers/search_bars/generic_search_bar/generic_search_bar";
import { OrganizationContext } from "../../organization_controller_context";
import { CourseAccordion } from "src/components/accordions/course_accordion/course_accordion";
import { MobileCoursesButtons } from "./components/mobile_courses_buttons";
import { CoursesButtons } from "./components/courses_buttons";
import { DialogBase } from "src/components/bases/dialog_base";
import { CustomStepper } from "src/components/stepper/custom_stepper/custom_stepper";
import { BasePhotoText } from "src/components/bases/base_photo_text";
import { AutocompleteWithVirtualizer } from "src/components/autocomplete_with_virtualizer/autocomplete_with_virtualizer";

import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import { DescriptionTextField } from "src/components/pickers/text_fields/types/description_text_field";
import { School, Teacher } from "src/components/illustrations/illustrations";

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
  },
  teachersAutocomplete: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  nameTextField: {
    marginTop: theme.spacing(1)
  }
}));

export function OrganizationCourses(){
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
  }, [openDialog])

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
                    variant="filled"
                    required
                  />
                  <DescriptionTextField
                    className={classes.description}
                    variant="filled"
                    fullWidth              
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
                  <AutocompleteWithVirtualizer
                    multiple
                    fullWidth
                    className={classes.teachersAutocomplete}
                    options={users}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.username}
                    renderOption={(option, { selected }) => (
                      <>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankRoundedIcon fontSize="small"/>}
                          checkedIcon={<CheckBoxRoundedIcon fontSize="small"/>}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.username}
                      </>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} 
                        variant="filled" 
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
    </>
  );
}