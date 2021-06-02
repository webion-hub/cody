import { useParams } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { MultipleSectionsBase } from 'src/components/bases/layouts/multiple_sections_base';
import React, { useEffect } from "react";
import Organization from "src/lib/server_calls/organization";
import InfoArea from "src/components/bases/informations/info_area/info_area";
import CustomTreeView from "src/components/others/custom_treeview";
import Editor from "@monaco-editor/react";
import { TabContent } from "src/components/bases/layouts/tab_content";

import { IconButton, Tab, Tabs, Tooltip, useTheme } from "@material-ui/core";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { PageController } from "src/lib/page_controller";
import { BackgroundWithLines } from "src/components/others/background_with_lines/background_with_lines";
import { ListWithPages } from "src/components/lists/list_with_pages";
import { LinkMenu } from "src/components/typography/link_menu";
import { MenuWithWaves } from "src/components/menu/menus/menu_with_waves";
import { UserSmallSummary } from "src/components/user_summaries/user_small_summary";
import { User } from "src/lib/server_calls/user";

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
  const [callerIs, setCallerIs] = React.useState("noMember")
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

    getRole()
  }, [])

  const getRole = async () => {
    await User
      .getRoleIn(organizationId)
      .then(role => setCallerIs(role ?? "noMember"))
  }

  console.log(courseData?.teachers)

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
                <React.Fragment key={index}>
                  {index !== 0 ? ", " : "Professori: "}
                  <LinkMenu
                    MenuComponent={MenuWithWaves}
                    menuContent={
                      <UserSmallSummary
                        user={teacher}
                        callerIs={callerIs}
                        handler={organization}
                      />
                    }
                  >
                    {teacher.username}
                  </LinkMenu>
                </React.Fragment>
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
