import React, { useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	descriptionBox: props => ({
		height: props.showDescription ? props.descriptionHeight + 44 : 0, 
		transition: "0.25s height",
		"& > *": {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			opacity: props.showDescription ? 1 : 0, 
			transition: "0.25s opacity",
		}
	}),
	descriptionTitle: {
		paddingTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      textAlign: "center",
    },
	},
	description: props => ({
    display: props.noDescription && "none",
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      textAlign: "center",
    },
	})
}));

export default function OrganizationDescription(props){
	const descriptionRef = useRef();
	const descriptionHeight = descriptionRef.current?.offsetHeight
  
  const showDescription = props.showDescription
  const organizationData = props.organizationData

  const description = organizationData?.detail.description
  const noDescription = description?.length === 0 || description === null

	const classes = useStyles({showDescription, descriptionHeight, noDescription});

  return (
    <div className={classes.descriptionBox}>
      <Typography
        variant="subtitle1"
        className={classes.descriptionTitle}
      >
        {noDescription ? "Nessuna Descrizione" : "Descrizione"}
      </Typography>
      <Typography 
        ref={descriptionRef}
        variant="body2"
        className={classes.description}
      >
        {description}        
      </Typography>
    </div>
  );
}