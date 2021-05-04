import React from "react";
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Grid, IconButton } from "@material-ui/core";
import useTheme from '@material-ui/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import OrganizationDescription from "./components/organization_description";
import { OrganizationBadgeAvatar } from "./components/organization_badge_avatar";
import { OrganizationAvatarGroup } from "./components/organization_avatar_group/organization_avatar_group";
import { OrganizationInfo } from "./components/organization_info";

import { OrganizationSettingsMenu } from "src/components/menu/menus/organization_settings_menu";
import { OrganizationContext } from "../../organization_controller_context";
import { setOpacityColor } from "src/lib/setOpacityColor";

const useStyles = makeStyles((theme) => ({
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
    background: setOpacityColor(theme.palette.background.paperSecondary, 0.5),
  },
  organizationSettings: {
    position: "absolute",
    right: 8
  }
}));

export default function OrganizationInfoArea(){
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const [showDescription, setShowDescription] = React.useState(false)
	const classes = useStyles({showDescription});

	const {
		organizationData,
    callerIs,
		loading
	} = React.useContext(OrganizationContext);

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
					<OrganizationBadgeAvatar/>
          <OrganizationInfo
            className={classes.organizationInfoBox}
          />
          <OrganizationAvatarGroup/>
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
              callerIs={callerIs}
              loading={loading}
            />
            <IconButton 
              onClick={_ => setShowDescription(!showDescription)}
              disabled={loading}
            >
              <ExpandMoreRoundedIcon className={classes.expandIcon}/>
            </IconButton>
          </div>
        </div>
			</div>
    </>
  );
}