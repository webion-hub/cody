import React from 'react';

import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PageController } from 'src/lib/page_controller';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';

const useStyles = makeStyles((theme) => ({
	paper: {
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(3),
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
    },
	},
  button: {
    marginTop: theme.spacing(2),
    width: 200,
    margin: "0 auto",
    display: "block",
    textAlign: "center"
  }
}));

export function MessagePageBase(props) {
	const classes = useStyles();

  return (
    <CenterComponentPageBase>
      <Paper className={classes.paper}>
        <props.image 
          maxWidth={500}
          size="100%"
          margin="0 auto"
        />
        <Typography
          component="h1"
          variant="h3"
          align="center"
        >
          {props.title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
        >
          {props.subTitle}
        </Typography>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          href={props.href}
          onClick={(e) => PageController.push(props.href, e)}
          fullWidth
        >
          {props.buttonLabel}
        </Button>
      </Paper>
    </CenterComponentPageBase>
  );
}
