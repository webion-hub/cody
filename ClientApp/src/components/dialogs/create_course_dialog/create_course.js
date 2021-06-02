import React from 'react';

import { Box } from '@material-ui/core'

import { CustomStepper } from "src/components/bases/others/custom_stepper/custom_stepper";
import { FormatController } from 'src/lib/format_controller/format_controller';
import { lazyLoader } from 'src/components/utilities/lazy_loader';
import { OrganizationContext } from 'src/pages/organization/organization_controller_context';
import Organization from 'src/lib/server_calls/organization';
import { PageController } from 'src/lib/page_controller';

const AddCourseInfoStep = lazyLoader(() => import("./steps/add_course_info_step"));
const AddCourseTeachersStep = lazyLoader(() => import("./steps/add_course_teachers_step"));

export default function CreateCourse(props){
	const { organization, organizationData } = React.useContext(OrganizationContext);

  const [newCourseInfo, setNewCourseInfo] = React.useState({
    title: "",
    description: "",
    teachers: null,
    organization,
  });
  const [errors, setErrors] = React.useState({
    courseTitleError: false,
    descriptionError: false
  });

  const handleChange = (dataName) => (e) => {
    setNewCourseInfo({
      ...newCourseInfo,
      [dataName]: e.target.value,
    })
  }

  const handleTeachersChange = (teachers) => {
    const teachersPrep = teachers.map(teacher => teacher.id)

    setNewCourseInfo({
      ...newCourseInfo,
      teachers: teachersPrep,
    })
  }

  /**
   * @param {{organization: Organization}} values 
   */
  const tryCreateCourse = async (values) => {
    const organization = values.organization;
    await organization
      .courses
      .create({
        title: values.title,
        description: values.description,
        teachers: values.teachers,
      })
      .then(courseId => PageController.push(`/organization/${organizationData.id}/course/${courseId}`));
  }
 
  return (
    <CustomStepper
      data={newCourseInfo}
      onBackFirstPage={props.onClose}
      onFormCompleted={tryCreateCourse}
      firstPageLabel="Chiudi"
      component={Box}
      setErrors={setErrors}
      elements={[
        {
          element: <AddCourseInfoStep
            suspenseHeight={433}
            errors={errors}
            onTitleChange={handleChange('title')}
            onDescriptionChange={handleChange('description')}
            values={newCourseInfo}
          />,
          height: 433,
          controller: FormatController
            .setController()
            .add('courseTitle')
            .add('description')
        },
        {
          element: <AddCourseTeachersStep
            suspenseHeight={694}
            onTeachersChange={handleTeachersChange}
            teachers={newCourseInfo.teachers}
            errors={errors}
          />,
          height: 694,
          controller: FormatController
            .setController()
            .create({
              errorCondition: val => val.teachers.length === 0,
              errorLabel: 'teachersError'
            }) 
        },
      ]}
    />
  );
}