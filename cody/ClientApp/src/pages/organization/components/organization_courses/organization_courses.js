import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import { OrganizationContext } from "../../organization_controller_context";
import { CourseAccordion } from "src/components/accordions/course_accordion/course_accordion";

import { AddCourseButton } from "../../../../components/buttons/add_course_button";
import { ListWithPages } from "src/components/lists/list_with_pages";

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
  
	const {
    organization,
    callerIs,
	} = React.useContext(OrganizationContext);

  return (
    <div className={classes.coursesBox}>
      <ListWithPages      
        maxPageElements={5}
        title="Corsi Disponibili"
        notFoundMessage="Nessun corso trovato."
        getData={organization.courses.listAll}
        listItem={CourseAccordion}
        rightIcon={
          <AddCourseButton
            callerIs={callerIs}
          />
        }
      />
    </div>
  );
}