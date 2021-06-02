import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { Grid, Link } from "@material-ui/core";
import { Color } from 'src/lib/color/color';
import React from 'react';
import { PageController } from 'src/lib/page_controller';
import { UserSmallSummary } from 'src/components/user_summaries/user_small_summary';
import { EventsDispatcher } from 'src/lib/events_dispatcher';
import { OrganizationContext } from 'src/pages/organization/organization_controller_context';
import { LinkMenu } from 'src/components/typography/link_menu';
import { MenuWithWaves } from 'src/components/menu/menus/menu_with_waves';

const useStyles = makeStyles((theme) => ({
  sumamry: {
    background: Color.o(theme.palette.background[800], 0.3)
  },
  teachersContainer: {
    width: "calc(100% - 100px)",
  },
  title: {
    width: "100%"
  },
  teachers: {
    width: "100%"
  },
  teachersLabel: {
    width: "100%"
  },
  accordionSummaryContent: {
    width: 0,
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
          direction="column"
          className={classes.teachersContainer}
        >
          <Typography
            noWrap
            className={classes.title}
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
          <Typography
            className={classes.teachersLabel}
            variant="caption"
            align="left"
            color="textSecondary"
            noWrap
          >
            Professori
          </Typography>
          <Typography
            className={classes.teachers}
            align="left"
            color="textSecondary"
            noWrap
          >
            {teachers.map((teacher, index) => 
              <React.Fragment key={index}>
                {index !== 0 ? ", " : ""}
                <LinkMenu
                  MenuComponent={MenuWithWaves}
                  menuContent={
                    <UserSmallSummary
                      user={teacher}
                      callerIs={callerIs}
                      handler={organization}
                      onUserUpdate={_ => EventsDispatcher.setEvent('updateOrganizationMember').update()}
                    />
                  }
                >
                  {teacher.username}
                </LinkMenu>
              </React.Fragment>
            )}
          </Typography>
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