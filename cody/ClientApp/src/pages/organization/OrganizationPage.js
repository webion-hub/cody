import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import OrganizationInfoArea from "./components/organization_info_area";
import { PaperWithWaves } from "src/components/paper_with_waves";
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import OrganizationTreeView from "./components/organization_treeview";
import OrganizationCourses from "./components/organization_courses";
import OrganizationAvatarList from "./components/organization_avatar_list";
import Organization from "src/lib/server_calls/organization";

export const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    height: 192,
    width: "100%",
    background: `url(images/forest.webp)`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    position: "relative"
  },
	centerPaperContainer: {
		padding: theme.spacing(2),
		height: "100%"
	},
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
		background: theme.palette.background.paper,
		width: `${props.rightSectionWidth}%`,
		[theme.breakpoints.down('xs')]: {
      width: "0%"
    },
	}),
	userList: {
		position: "sticky !important",
		top: theme.appBar.fullHeight,
		[theme.breakpoints.down('xs')]: {
			top: theme.appBar.mobileHeight,
    },
	}
}));

export default function OrganizationPage(){
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
  const [loading, setLoading] = React.useState(false)
  const [organizationData, setOrganizationData] = React.useState(null)
  const { id } = useParams();
	const organization = Organization.withId(id)

  useEffect(() => {
    getOrganizationByPageId()
  }, [id])

  const getOrganizationByPageId = () => {
    setLoading(true)
    organization
      .getInfo()
      .then(data => {
        console.log(data)
        setOrganizationData(data)})
      .finally(_ => setLoading(false))
  } 

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
      		<div className={classes.backgroundImage}/>

					<Grid
						container
						direction="row"
					>
						<Grid
							item
							className={classes.centerSectionWidth}
						>
							<PaperWithWaves className={classes.centerPaperContainer}>
								<OrganizationInfoArea
									id={id}
									organizationData={organizationData}
									loading={loading}
								/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
								<OrganizationCourses/>
							</PaperWithWaves>
						</Grid>
						<Grid 
							item
							className={classes.userListContainer}
						>
							<OrganizationAvatarList 
								organization={organization}
								className={classes.userList}
							/>
						</Grid>
					</Grid>	
				</Grid>		
			</Grid>
			{mobileView && treeViewSection}
    </>
  );
}