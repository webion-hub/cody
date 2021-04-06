import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Organizations } from "src/lib/server_calls/organizations";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import OrganizationInfoArea from "./components/organization_info_area";
import { PaperWithWaves } from "src/components/paper_with_waves";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
	}
}));

export default function OrganizationPage(){
	const classes = useStyles();
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

  return (
    <>
      <div className={classes.backgroundImage}/>
			<Grid
				container
				direction="row"
			>
				<Grid 
					item
					xs={2}
				>

				</Grid>				
				<Grid 
					item
					xs={8}
				>
					<PaperWithWaves className={classes.container}>
						<OrganizationInfoArea
							id={id}
							organizationData={organizationData}
							loading={loading}
						/>
						<div className={classes.coursesBox}>
							<Typography
								className={classes.coursesTitle}
								variant="h4"
							>
								Corsi Disponibili
							</Typography>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>Accordion 1</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
										sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>Accordion 1</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
										sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>Accordion 1</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
										sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>
						</div>
					</PaperWithWaves>
				</Grid>				
				<Grid 
					item
					xs={2}
				>

				</Grid>
			</Grid>

    </>
  );
}