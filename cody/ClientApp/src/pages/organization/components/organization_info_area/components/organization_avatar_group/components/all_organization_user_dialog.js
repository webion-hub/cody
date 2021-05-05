import React from "react";
import { DialogBase } from "src/components/bases/dialog_base";
import { ListWithSearch } from "src/components/list_with_search/list_with_search";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { OrganizationContext } from "src/pages/organization/organization_controller_context";

import { UserListItem } from "src/components/list_items/user_list_item";
import { EventsDispatcher } from "src/lib/events_dispatcher";
import { UserSmallSummaryDialog } from "src/components/user_summaries/user_small_summary_dialog";
import { UserSummaryCardWithImageTransition } from "src/components/user_summaries/user_summary_card_with_image_transition";

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
  userList: {
    background: theme.palette.background.backgroundTransparent,
    backdropFilter: "blur(10px)",
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
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
	const classes = useStyles();
  
  const [userData, setUserData] = React.useState(null)

  const {
    organization,
    callerIs,
  } = React.useContext(OrganizationContext);

  const handleClose = () => {
    props.onClose()
    setUserData(null)
  }

  const handleUserChange = React.useCallback((user) => {
    setUserData(user)
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
          onClose={_ => setUserData(null)}
          userData={userData}
          callerIs={callerIs}
          handler={organization}
          onUserUpdate={updateOrganizationMember}
        />
        <ListWithSearch
          className={classes.areaWidth}
          paperClassName={classes.userList}
          listHeight={400}
          listMobileHeight={window.innerHeight / 2}
          width="100%"
          elementForStep={25}
          itemSize={56}
          getList={organization.getMembers}
          listItem={UserListItem}
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