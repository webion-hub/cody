import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Fade, Grid, LinearProgress } from "@material-ui/core";

import { OrganizationContext } from "../../organization_controller_context";
import { CourseAccordion } from "src/components/accordions/course_accordion/course_accordion";

import { useMobileView } from "src/lib/hooks/use_mobile_view";
import { SearchBarWithPageController } from "src/components/pickers/search_bars/search_bar_with_page_controller/search_bar_with_page_controller";
import { usePageController } from "src/lib/hooks/use_page_controller";
import { AddCourseButton } from "../../../../components/buttons/add_course_button";

const useStyles = makeStyles((theme) => ({
	coursesBox: {
		paddingTop: theme.spacing(6),
    padding: theme.spacing(2)
	},
	coursesTitle: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: `calc(100vw - ${theme.spacing(4)}px)`
    },
	},
  searchBar: {
    marginBottom: theme.spacing(2),
  },
  linearProgress: {
    marginBottom: theme.spacing(1)
  }
}));

export function OrganizationCourses(){
	const classes = useStyles();
  const mobileView = useMobileView()
  
	const {
    organization,
    callerIs,
	} = React.useContext(OrganizationContext);

	const pageController = usePageController({
		maxPageElements: 5,
		getData: organization
      .courses
      .listAll
	})

	const {
		next,
		back,
		handleChange,
		loading,
		dataList: courses
	} = pageController


  const getCourses = () => {
    if(courses.length === 0)
      return (
        <Typography>
          Nessun corso trovato.
        </Typography>
      )

    return courses.map((course, index) => 
      <CourseAccordion
        index={index}
        key={index}
        data={course}
      />
    )
  }

  return (
    <div className={classes.coursesBox}>
      <Grid
        className={classes.coursesTitle}
        container
        direction="row"
        alignItems="center"
      >
        <Typography
          variant={mobileView ? "h5" : "h4"}
          noWrap
        >
          Corsi Disponibili
        </Typography>
        <AddCourseButton
          callerIs={callerIs}
        />
      </Grid>
      <SearchBarWithPageController 
        className={classes.searchBar}
        onChange={handleChange}
        onBack={back.handle}
        onNext={next.handle}
        disableBack={back.disable}
        disableNext={next.disable}
      />
      <Fade 
        className={classes.linearProgress}
        in={loading}>
        <LinearProgress color="secondary"/>
      </Fade>
      {getCourses()}
    </div>
  );
}