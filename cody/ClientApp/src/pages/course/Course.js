import { useParams } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { MultipleSectionsBase } from 'src/components/bases/layouts/multiple_sections_base';
import React, { useEffect } from "react";
import Organization from "src/lib/server_calls/organization";
import InfoArea from "src/components/bases/informations/info_area/info_area";
import CustomTreeView from "src/components/others/custom_treeview";
import Editor from "@monaco-editor/react";
import { TabContent } from "src/components/bases/layouts/tab_content";

import TooltipAvatarLink from "src/components/avatars/tooltip_avatar_link";
import { IconButton, Tab, Tabs, Tooltip, useTheme } from "@material-ui/core";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { PageController } from "src/lib/page_controller";
import { BackgroundWithLines } from "src/components/others/background_with_lines/background_with_lines";
import { ListWithPages } from "src/components/lists/list_with_pages";

const useStyles = makeStyles((theme) => ({
  lessonBox: {
    paddingTop: theme.spacing(6),
    padding: theme.spacing(2)
  }
}));

export default function Course(){
  const classes = useStyles();
	const theme = useTheme();

  const { organizationId, courseId } = useParams();
  const [courseData, setCourseData] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [tab, setTab] = React.useState(0);

  const organization = Organization
    .withId(organizationId)

  const course = organization
    .course(courseId)

  useEffect(() => {
    setLoading(true)
    course
      .getInfo()
      .then(setCourseData)
      .finally(_ => setLoading(false))
  }, [])

  return(
    <MultipleSectionsBase
			leftSection={<CustomTreeView/>}	
      centerSection={
        <>
          <InfoArea
            loading={loading}
            data={{
              title: courseData?.title,
              subTitle: courseData?.teachers?.map((teacher, index) => 
                <>
                  {index !== 0 ? ", " : "Professori: "}
                  <TooltipAvatarLink
                    user={teacher}
                  />
                </>
              )
            }}
            leftIcon={
              <Tooltip
                arrow
                placement="bottom"
                title="Torna all' organizzazione"
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
          <div style={{position: "relative"}}>
            <Tabs              
              value={tab} 
              onChange={(_, val) => setTab(val)}
            >
              <Tab label="Lezioni"/>
              <Tab label="Esercitazioni"/>
            </Tabs>
            <TabContent tabValue={tab} index={0}>
              <div className={classes.lessonBox}>
                <ListWithPages
                  maxPageElements={5}
                  title="Lezioni Disponibili"
                  notFoundMessage="Nessuna lezione trovata."
                  getData={course.getLessons}
                />
              </div>
            </TabContent>
            <TabContent tabValue={tab} index={1}>
              aaaaaaaaaaa
            </TabContent>
            <BackgroundWithLines background={theme.palette.background[550]}/>
          </div>
          <Editor
            width="100%"
            height="350px"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue='console.log("ciao mondo");'
          />
        </>
      }
    />
  );
}
