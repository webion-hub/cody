import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton } from "@material-ui/core";
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';

import OrganizationDescription from "../organization_description";
import { OrganizationBadgeAvatar } from "./components/organization_badge_avatar";
import { OrganizationAvatarGroup } from "./components/organization_avatar_group/organization_avatar_group";
import { OrganizationInfo } from "./components/organization_info";

import MenuItem from '@material-ui/core/MenuItem';
import { MenuWithLoading } from "src/components/menu/menu_with_loading";
import { MenuItemBase } from "src/components/menu/menu_item_base";

import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { LeaveOrganizationButton } from "src/components/buttons/leave_organization_button/leave_organization_button";

export const useStyles = makeStyles((theme) => ({
  organizationInfoContainer: {
    background: theme.palette.background.backgroundTransparent,
  },
  organizationInfoList: {
    width: "auto",
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingTop: theme.spacing(2),
    },
  },
  organizationInfoBox:{
    display: "grid",
    marginLeft: theme.spacing(3),
    tableLayout: "fixed",
    width: `calc(100% - 198px)`,
    transition: "0.25s all",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      textAlign: "center",
      marginTop: theme.spacing(2),
      marginLeft: 0,
    },
  },
	bottomArea: {
		width: "100%",
		textAlign: "center",
    position: "relative",
	},
	expandIcon: props => ({
		transform: props.showDescription && "rotate(180deg)",
		transition: "0.25s all"
	}),
  descriptionBox: {
    background: theme.palette.background.backgroundTransparent,
  },
  organizationSettings: {
    position: "absolute",
    right: 8
  }
}));

export default function OrganizationInfoArea(props){
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const [showDescription, setShowDescription] = React.useState(false)
	const classes = useStyles({showDescription});

  const organizationData = props.organizationData
  
  return (
    <>
			<div className={classes.organizationInfoContainer}>
				<Grid
          className={classes.organizationInfoList}
          style={{position: "relative"}}
					container
					direction={mobileView ? "column" : "row"}
          alignItems="center"
				>
					<OrganizationBadgeAvatar
            id={props.id}
            organizationData={organizationData}
            loading={props.loading}
          />
          <OrganizationInfo
            className={classes.organizationInfoBox}
            organizationData={organizationData}
            loading={props.loading}
          />
          <OrganizationAvatarGroup
            organization={props.organization}
          />
				</Grid>
        <div className={classes.descriptionBox}>
          <OrganizationDescription
            organizationData={organizationData}
            showDescription={showDescription}
          />
          <div className={classes.bottomArea}>
            <OrganizationSettingsMenu 
              className={classes.organizationSettings}
              organizationData={organizationData}
            />
            <IconButton 
              onClick={_ => setShowDescription(!showDescription)}
              disabled={props.loading}
            >
              <ExpandMoreRoundedIcon className={classes.expandIcon}/>
            </IconButton>
          </div>
        </div>
			</div>
    </>
  );
}

function OrganizationSettingsMenu(props){
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton 
        className={props.className}
        onClick={handleClick}  
      >
        <MoreHorizRoundedIcon/>
      </IconButton>
      <MenuWithLoading
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ReportMenuItem/>
        <LeaveOrganizationtMenuItem
          organizationData={props.organizationData}
          onClose={handleClose}
        />
      </MenuWithLoading>
    </>
  )
}

export const ReportMenuItem =  React.forwardRef((props, ref) => {   
  return ( 
    <MenuItemBase
      ref={ref}
      onClick={_ => {}}
      icon={ReportRoundedIcon}
      label="Segnala"
    />
  );
})

export const LeaveOrganizationtMenuItem =  React.forwardRef((props, ref) => {
  const organizationData = props.organizationData
  if(!organizationData.isCallerAMember)
    return null
    
  return (
    <LeaveOrganizationButton
      organization={organizationData}
      ButtonComponent={MenuItemBase}
      customComponentProps={{
        ref: ref,
        color: "error",
        icon: ExitToAppRoundedIcon,
        onClick: props.onClose
      }}
    />
  );
})