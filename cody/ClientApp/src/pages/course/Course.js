import { useParams } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { MultipleSectionsBase } from 'src/components/bases/multiple_sections_base';
import React, { useEffect } from "react";
import Organization from "src/lib/server_calls/organization";
import InfoArea from "src/components/info/info_area";
import CustomTreeView from "src/components/custom_treeview";
import Editor from "@monaco-editor/react";

import TooltipLink from "src/components/typography/tooltip_link";
import { IconButton, Tooltip } from "@material-ui/core";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { PageController } from "src/lib/page_controller";

const useStyles = makeStyles((theme) => ({

}));

export default function Course(){
  const classes = useStyles();
  const { organizationId, courseId } = useParams();
  const [courseData, setCourseData] = React.useState()

  const course = Organization
    .withId(organizationId)
    .course(courseId)

  useEffect(() => {
    course
      .getInfo()
      .then(setCourseData)
  })

  return(
    <MultipleSectionsBase
			leftSection={<CustomTreeView/>}	
      centerSection={
        <>
          <InfoArea
            data={{
              title: courseData?.title,
              subTitle: courseData?.teachers?.map((teacher, index) => 
                <>
                  {index !== 0 ? ", " : "Professori: "}
                  <TooltipLink
                    user={teacher}
                  />
                </>
              )
            }}
            leftIcon={
              <Tooltip
                arrow
                placement="bottom"
                title="Torna alla organizzazione"
              >
                <IconButton
                  href={`/organization/${organizationId}`}
                  onClick={e => PageController.push(`/organization/${organizationId}`, e)}
                >
                  <ArrowBackRoundedIcon/>
                </IconButton>
              </Tooltip>
            }
          />
          <Editor
            width="100%"
            height="calc(100vh - 262px)"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue='console.log("ciao mondo");'
          />
        </>
      }
    />
  );
}
