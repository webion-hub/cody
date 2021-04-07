import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Organizations } from "src/lib/server_calls/organizations";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import OrganizationInfoArea from "./components/organization_info_area";
import { PaperWithWaves } from "src/components/paper_with_waves";
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import TreeView from '@material-ui/lab/TreeView';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import TreeItem from '@material-ui/lab/TreeItem';
import OrganizationTreeView from "./components/organization_treeview";
import OrganizationCourses from "./components/organization_courses";

export const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    height: 192,
    width: "100%",
    background: `url(images/forest.webp)`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    position: "relative"
  },
	container: {
		padding: theme.spacing(2)
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
	userList: props => ({
		width: `${props.rightSectionWidth}%`,
		[theme.breakpoints.down('xs')]: {
      width: "0%"
    },
	})
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
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false)
  const [organizationData, setOrganizationData] = React.useState(null)

  useEffect(() => {
    getOrganizationByPageId()
  }, [id])

  const getOrganizationByPageId = () => {
    setLoading(true)
    Organizations
      .getById(id)
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
						item
						className={classes.centerSectionWidth}
					>
						<PaperWithWaves className={classes.container}>
							<OrganizationInfoArea
								id={id}
								organizationData={organizationData}
								loading={loading}
							/>
							<OrganizationCourses/>
						</PaperWithWaves>
					</Grid>
				</Grid>
				<Grid 
					item
					className={classes.userList}
				>

				</Grid>			
			</Grid>
			{mobileView && treeViewSection}
    </>
  );
}