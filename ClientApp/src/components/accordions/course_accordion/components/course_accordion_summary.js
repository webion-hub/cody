import { makeStyles } from '@material-ui/core/styles';
import { Button, useTheme } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { Grid, Link } from "@material-ui/core";
import { Color } from 'src/lib/color/color';
import React from 'react';
import { PageController } from 'src/lib/page_controller';
import { OrganizationContext } from 'src/pages/organization/organization_controller_context';
import { CustomAvatarGroup } from 'src/components/avatars/custom_avatar_group/custom_avatar_group';

const useStyles = makeStyles((theme) => ({
  sumamry: {
    background: theme.palette.background[750],
    "&:hover": {
      background: "inherit",
      boxShadow: `inset 6px 0px 0px 0px ${Color.o(theme.palette.secondary.main, 0.9)}`
    }
  },
  teachersContainer: {
    width: "calc(100% - 100px)",
  },
  halfLabel: {
    width: "50%"
  },
  accordionSummaryContent: {
    width: 0,
    margin: "4px 0"
  },
  openButton: {
    transform: "translate(0, -50%)",
    top: "50%",
    position: "absolute",
    right: 16
  },
}));

export function CourseAccordionSummary(props){
	const classes = useStyles();
  const theme = useTheme()

  const {
    id,
    title,
    teachers,
  } = props

	const {
    callerIs,
    organization,
	} = React.useContext(OrganizationContext);
  

  return (
    <AccordionSummary
      className={classes.sumamry}
      classes={{
        content: classes.accordionSummaryContent
      }}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          className={classes.teachersContainer}
        >
          <Typography
            className={classes.halfLabel}
            noWrap
            variant="h6"
            color="secondary"
          >
            <Link
              color="inherit"
              href={`${window.location.pathname}/course/${id}`}
              onClick={e => {
                e.stopPropagation()
                PageController.push(`${window.location.pathname}/course/${id}`, e)
              }} 
            >
              {title}
            </Link>
          </Typography>
          <CustomAvatarGroup
            users={teachers}
            direction="horizontal"
            callerIs={callerIs}
            handler={organization}
            borderColor={theme.palette.background[750] }
            size={30}
            maxAvatars={4}
          />
        </Grid>
      </Grid>
      <div>
        <Button
          className={classes.openButton}
          href={`${window.location.pathname}/course/${id}`}
          onClick={e => {
            e.stopPropagation()
            PageController.push(`${window.location.pathname}/course/${id}`, e)
          }}
          endIcon={<OpenInNewIcon/>}
          color="secondary"
          variant="outlined"
        >
          Apri
        </Button>
      </div>
    </AccordionSummary>
  )
}