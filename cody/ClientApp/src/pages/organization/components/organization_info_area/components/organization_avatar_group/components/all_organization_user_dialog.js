import React from "react";
import { DialogBase } from "src/components/bases/dialog_base";
import { ListWithSearch } from "src/components/list_with_search/list_with_search";
import { Button, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { UserGroup } from "src/components/illustrations/user_group";
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { OrganizationContext } from "src/pages/organization/organization_controller_context";

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { UserSummaryCard } from "src/components/user_summary_card";
import { UserSmallSummary } from "src/components/user_small_summary";
import { UserListItem } from "src/components/list_items/user_list_item";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    maxWidth: 648,
    width: "100%",
    [theme.breakpoints.down('xs')]: {
			margin: theme.spacing(2),
    },
  },
  mobileDialog: {
    padding: "0px !important",
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
    animation: `$fade 0.25s linear`,
  },
  "@keyframes fade": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    }
  },

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
        {
          mobileView ?
            <DialogBase
              className={classes.mobileDialog}
              open={userData !== null}
              onClose={_ => setUserData(null)}
            >
              <UserSmallSummary
                user={userData}
                callerIs={callerIs}
              />
            </DialogBase>
            :
            <Grid
              className={classes.areaWidth}
              container
              direction="column"
              alignItems="center"
            >
              <UserGroup 
                className={`${userData !== null ? classes.hideImage : ""} ${classes.image}`}
                maxWidth={300} 
                size="100%" 
                padding={4}
              />
              {
                userData !== null &&
                  <div className={classes.userSmallSummary}>
                    <UserSummaryCard
                      user={userData}
                      callerIs={callerIs}
                      leftIcon={
                        <IconButton 
                          onClick={_ => setUserData(null)}
                        >
                          <CloseRoundedIcon/>
                        </IconButton>
                      }
                    />
                  </div>
              }
            </Grid>
        }
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