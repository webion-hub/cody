import React from "react";
import { DialogBase } from "src/components/bases/dialog_base";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { OrganizationContext } from "src/pages/organization/organization_controller_context";

import { EventsDispatcher } from "src/lib/events_dispatcher";
import { UserSmallSummaryDialog } from "src/components/user_summaries/user_small_summary_dialog";
import { UserSummaryCardWithImageTransition } from "src/components/user_summaries/user_summary_card_with_image_transition";
import { UserListItemWithShowMore } from "src/components/list_items/user_list_items/user_list_item_with_showmore";
import { ListWithActiveIds } from "src/components/lists/list_with_active_ids";
import { useMobileView } from "src/lib/hooks/use_mobile_view";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    maxWidth: 648,
    width: "100%",
    [theme.breakpoints.down('xs')]: {
			margin: theme.spacing(2),
    },
  },
  areaWidth: {
    width: "50%",
    position: "relative",
    [theme.breakpoints.down('xs')]: {
			margin: "0 auto",
        maxWidth: 300,
        width: "100%",
    },
  },
  image: {
    transition: "0.25s transform"
  },
  hideImage: {
    transform: "translate(-300px, 0px)"
  },
  userSmallSummary: {
    width: "100%",
    height: "100%",
    marginLeft: -12,
    position: "absolute",
  }
}));

export function AllOrganizationUserDialog(props){
  const mobileView = useMobileView()
	const classes = useStyles();
  
  const [userData, setUserData] = React.useState(null)
  const {
    addActiveId,
    cleanActiveIds,
    isActive,
    ListWithActiveIdsComponent
  } = ListWithActiveIds()


  const {
    organization,
    callerIs,
  } = React.useContext(OrganizationContext);

  const handleClose = () => {
    props.onClose()
    setUserData(null)
    cleanActiveIds()
  }

  const handleCloseCard = () => {
    setUserData(null)
    cleanActiveIds()
  }

  const handleUserChange = React.useCallback((user) => {
    const id = user.id
    if(isActive(id)){
      handleCloseCard()
      return
    }

    setUserData(user)
    cleanActiveIds()
    addActiveId(id)
  }, [userData])

  const updateOrganizationMember = (val) => {
    EventsDispatcher
      .setEvent('updateOrganizationMember')
      .update()
  }

  const UserSummary = mobileView 
    ? UserSmallSummaryDialog 
    : UserSummaryCardWithImageTransition

  return (
    <DialogBase
      open={props.open}
      onClose={handleClose}
      paperClassName={classes.dialogPaper}
      title="Tutti gli utenti"
      firstButton={
        <Button
          color="primary"
          variant="contained"
          onClick={handleClose}
        >
          Chiudi
        </Button>
      }
    >
      <Grid
        container
        direction="row"
      >
        <UserSummary
          className={classes.areaWidth}
          onClose={handleCloseCard}
          userData={userData}
          callerIs={callerIs}
          handler={organization}
          onUserUpdate={updateOrganizationMember}
        />
        <ListWithActiveIdsComponent
          className={classes.areaWidth}
          listHeight={400}
          listMobileHeight={window.innerHeight / 2}
          width="100%"
          elementForStep={25}
          itemSize={56}
          getList={organization.getMembers}
          listItem={UserListItemWithShowMore}
          listItemProps={{
            onClick: handleUserChange 
          }}
          noDataFoundProps={{
            hide: true,
          }}
        /> 
      </Grid>
    </DialogBase> 
  )
}