import React, { useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BackgroundWithLines } from 'src/components/background_with_lines';

import { OrganizationsInfo } from 'src/pages/create_or_join_organization/create_or_join_organization_components/organizations_info';

import { SelectAction } from 'src/pages/create_or_join_organization/select_action';
import { CreateOrganization } from 'src/pages/create_or_join_organization/create_organization';
import { JoinOrganization } from 'src/pages/create_or_join_organization/join_organization';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minHeight: "100vh",
    position: "relative",
  }
}));

export function CreateOrJoinOrganization(){
  const classes = useStyles();
  const infoRef = React.createRef();

  const [content, setContent] = React.useState("selectAction");

  useEffect(() => {
    switch(window.location.hash){
      case "#create":
        return setContent("create");
      case "#join":
        return setContent("join");
      case "#":
      default:
        return setContent("selectAction");
    }
  })

  const selectAction = 
    <SelectAction
      onCreate={() => {
        setContent("create")
        window.location.hash = "create";
      }}
      onJoin={() => {
        setContent("join")
        window.location.hash = "join";
      }}
      infoRef={infoRef}
    />
  
  const createOrganization = 
    <CreateOrganization
      onBack={() => {
        setContent("selectAction")
        window.location.hash = "";
        window.location.hash.replace("#", "");
      }}
      infoRef={infoRef}    
    />

  const joinOrganization = 
    <JoinOrganization
      onBack={() => {
        setContent("selectAction")
        window.location.hash = "";
        window.location.hash.replace("#", "");
      }}
      infoRef={infoRef}    
    />

  const getContent = () => {
    switch(content){
      case "create":
        return createOrganization;
      case "join":
        return joinOrganization;
      case "selectAction":
      default:
        return selectAction;
    }  
  }

  return(
    <>
      <Grid
        className={classes.pageContainer}
        container
        justify="center"
        alignItems="center"
      >
        {getContent()}
        <BackgroundWithLines 
          height={1}
        /> 
      </Grid>
      <div ref={infoRef}>
        <OrganizationsInfo/>
      </div>
    </>
  );
}