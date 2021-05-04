import React, { useRef } from "react";
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Grid, Link, Typography } from "@material-ui/core";

import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';

const useStyles = makeStyles((theme) => ({
	descriptionBox: props => ({
		height: props.showDescription 
      ? props.descriptionHeight + props.offset 
      : 0, 
		transition: "0.25s height",
		"& > *": {
			opacity: props.showDescription ? 1 : 0, 
			transition: "0.25s opacity",
		}
	}),
	descriptionTitle: {
		padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      justifyContent: "center",
    },
	},
	description: props => ({
    display: props.noDescription && "none",
    paddingTop: 0,
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      textAlign: "center",
    },
	}),
  website: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      justifyContent: "center",
    },
  },
  icon: {
    marginRight: 4,
    transform: "translate(0px, 4px)"
  }
}));

export default function OrganizationDescription(props){
	const descriptionRef = useRef();
	const descriptionHeight = descriptionRef.current?.offsetHeight
  
  const showDescription = props.showDescription
  const organizationData = props.organizationData

  const description = organizationData?.detail.description
  const website = organizationData?.detail.website

  const noDescription = description?.length === 0 || description === null

  const offset = website ? 88 : 44

	const classes = useStyles({
    showDescription,
    descriptionHeight, 
    noDescription,
    offset
  });

  return (
    <div className={classes.descriptionBox}>
      {
        website &&
          <Grid
            className={classes.website}
            container
            direction="row"
          >
            <LanguageRoundedIcon 
              className={classes.icon}
              fontSize="small"
            />
            <Typography 
              variant="subtitle1"
            >
              <Link
                href={website}
                target="_blank"
                color="inherit"
              >
                {website}
              </Link>
            </Typography>
          </Grid>

      }
      <Grid
        container
        direction="row"
        className={classes.descriptionTitle}
      >
        <DescriptionRoundedIcon 
          className={classes.icon}
          fontSize="small"
        />
        <Typography
          variant="subtitle1"
        >
          {noDescription ? "Nessuna Descrizione" : "Descrizione"}
        </Typography>
      </Grid>
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