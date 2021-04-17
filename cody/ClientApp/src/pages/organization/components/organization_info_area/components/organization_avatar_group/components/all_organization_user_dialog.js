import React, { useEffect } from "react";
import { DialogBase } from "src/components/bases/dialog_base";
import { ListWithSearch } from "src/components/list_with_search/list_with_search";
import { Button, Grid, IconButton, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { CustomAvatar } from "src/components/custom_avatar";
import { makeStyles } from '@material-ui/core/styles';
import { BasePhotoText } from "src/components/bases/base_photo_text";
import { UserGroup } from "src/components/illustrations/user_group";
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { OrganizationContext } from "src/pages/organization/organization_controller_context";
import { UserSmallSummary } from "src/components/user_small_summary";

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "100%",
    tableLayout: "fixed",
    padding: theme.spacing(1)
  },
  dialogPaper: {
    maxWidth: 648,
    width: "100%"
  },
  userList: {
    background: theme.palette.background.backgroundTransparent,
    backdropFilter: "blur(10px)",
  },
  areaWidth: {
    maxWidth: 300
  },
  image: {
    transition: "0.25s transform"
  },
  hideImage: {
    transform: "translate(-300px, 0px)"
  },
  userSmallSummary: {
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

  return (
    <DialogBase
      open={props.open}
      onClose={handleClose}
      paperClassName={classes.dialogPaper}
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
        <Grid
          className={classes.areaWidth}
          container
          direction="column"
          alignItems="center"
        >
          {
            !mobileView && 
              <UserGroup 
                className={`${userData !== null ? classes.hideImage : ""} ${classes.image}`}
                maxWidth={300} 
                size="100%" 
                padding={4}
              />
          }
          {
            userData !== null &&
              <div className={classes.userSmallSummary}>
                <IconButton 
                  onClick={_ => setUserData(null)}
                >
                  <CloseRoundedIcon/>
                </IconButton>
                <UserSmallSummary
                  user={userData}
                  callerIs={callerIs}
                />
              </div>

          }
        </Grid>
        <ListWithSearch
          className={classes.areaWidth}
          paperClassName={classes.userList}
          listHeight={400}
          listMobileHeight={window.innerHeight / 2}
          width="100%"
          elementForStep={25}
          itemSize={56}
          getList={organization.getMembersOf}
          listItem={AvatarListItem}
          listItemProps={{
            onClick: data => setUserData(data)
          }}
          noDataFoundProps={{
            hide: true,
          }}
        /> 
      </Grid>
    </DialogBase> 
  )
}

function AvatarListItem(props){
	const classes = useStyles();

  return (
    <div style={props.style} key={props.index}>
      <ListItem 
        className={classes.listItem}
        ContainerComponent="div" 
        button
        onClick={_ => props.onClick?.(props.data)}
      >
        <ListItemAvatar>
          <CustomAvatar
            src={`user/profile_picture/${props.data?.id}`}
            alt={props.data?.username}
          />
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{
            noWrap: true
          }}
        >
          {props.data?.username}
        </ListItemText>
      </ListItem>
    </div>
  )
}