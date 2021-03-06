import React from 'react';

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

  const selectAction = 
    <SelectAction
      onCreate={() => setContent("create")}
      onJoin={() => setContent("join")}
      infoRef={infoRef}
    />
  
  const createOrganization = 
    <CreateOrganization
      onBack={() => setContent("selectAction")}
      infoRef={infoRef}    
    />

  const joinOrganization = 
    <JoinOrganization
      onBack={() => setContent("selectAction")}
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