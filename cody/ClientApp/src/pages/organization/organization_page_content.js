import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import OrganizationInfoArea from "./components/organization_info_area/organization_info_area";
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import OrganizationTreeView from "./components/organization_treeview";
import { OrganizationImageBackground } from "./components/organzation_image_background";
import { BackgroundWithLines } from "src/components/background_with_lines/background_with_lines";
import { OrganizationCourses } from "./components/organization_courses/organization_courses";

const useStyles = makeStyles((theme) => ({
	coursesBox: {
		marginTop: theme.spacing(8),
	},
	coursesTitle: {
		paddingBottom: theme.spacing(1)
	},
	treeView: props => ({
		padding: theme.spacing(2),
		width: `${props.leftAndRightSectionWidth}%`,
		[theme.breakpoints.down('xs')]: {
      width: "0%"
    },
	}),
	backgroundImageContainer: props => ({
		width: `${props.imageSectionWidth}%`,
		[theme.breakpoints.down('xs')]: {
      width: "100%"
    },
	}),
	centerSectionWidth: props => ({
		width: `${100 - props.rightSectionWidth}%`,
		[theme.breakpoints.down('xs')]: {
      width: "100%"
    },
	}),
	userListContainer: props => ({
		padding: theme.spacing(1),
		width: `${props.rightSectionWidth}%`,
		[theme.breakpoints.down('xs')]: {
      width: "0%"
    },
	}),
	userList: {
		position: "sticky !important",
		top: theme.appBar.fullHeight + 8,
		[theme.breakpoints.down('xs')]: {
			top: theme.appBar.mobileHeight + 8,
    },
	},
	paper: {
		position: "relative"
	}
}));

export function OrganizationPageContent(){
	const leftAndRightSectionWidth = 15;
	const imageSectionWidth = 100 - leftAndRightSectionWidth
	const rightSectionWidth = (100 / imageSectionWidth)*leftAndRightSectionWidth
	const classes = useStyles({
		leftAndRightSectionWidth,
		imageSectionWidth,
		rightSectionWidth
	});

	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

	const treeViewSection = 
		<Grid 
			className={classes.treeView}
			item
		>
			<OrganizationTreeView/>
		</Grid>	

  return (
    <>
			<Grid				
				container
				direction="row"
			>
				{!mobileView && treeViewSection}
				<Grid 
					item
					className={classes.backgroundImageContainer}
				>
					<OrganizationImageBackground/>
					<Grid
						container
						direction="row"
					>
						<Grid
							item
							className={classes.centerSectionWidth}
						>
							<OrganizationInfoArea/>
							<div className={classes.paper}>
								<OrganizationCourses/>
								<BackgroundWithLines background={theme.palette.background.paper}/>
							</div>
						</Grid>
						<Grid 
							item
							className={classes.userListContainer}
						>
						</Grid>
					</Grid>	
				</Grid>		
			</Grid>
			{mobileView && treeViewSection}
    </>
  );
}