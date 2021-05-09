import { Grid, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SnackbarAlert from 'src/components/snackbar_alert';

export default function ColorsTab() {
  const theme = useTheme()

  return (
    <Grid
      style={{
        background: theme.palette.text.primary,
        color: theme.palette.background.default,
        position: "absolute",
        height: '100%'
      }}
      container
      direction="row"
      alignItems="center"
      justify="space-evenly"
    >
      <div>
        background
        <Co shade='dark4' color='background'/>
        <Co shade='dark3' color='background'/>
        <Co shade='dark2' color='background'/>
        <Co shade='dark1' color='background'/>

        <Co shade='default' color='background'/>

        <Co shade='light1' color='background'/>
        <Co shade='light2' color='background'/>
        <Co shade='light3' color='background'/>
        <Co shade='light4' color='background'/>
      </div>


      <div>
        primary
        <Co shade='dark4' color='primary'/>
        <Co shade='dark3' color='primary'/>
        <Co shade='dark2' color='primary'/>
        <Co shade='dark1' color='primary'/>

        <Co shade='main' color='primary'/>

        <Co shade='light1' color='primary'/>
        <Co shade='light2' color='primary'/>
        <Co shade='light3' color='primary'/>
        <Co shade='light4' color='primary'/>
      </div>


      <div>
        secondary
        <Co shade='dark4' color='secondary'/>
        <Co shade='dark3' color='secondary'/>
        <Co shade='dark2' color='secondary'/>
        <Co shade='dark1' color='secondary'/>

        <Co shade='main' color='secondary'/>

        <Co shade='light1' color='secondary'/>
        <Co shade='light2' color='secondary'/>
        <Co shade='light3' color='secondary'/>
        <Co shade='light4' color='secondary'/>
      </div>

    </Grid>

  );
}

const useStyles = makeStyles((theme) => ({
  box: {
    "&:hover": {
      cursor: 'pointer'
    }
  },
}));

function Co(props){
  const theme = useTheme()
	const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const {
    shade,
    color
  } = props

  const colorLabel = `theme.palette.${color}.${shade}`

  return <>
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.box}
      onClick={_ => setOpen(true)}
    >
      <div
        onClick={_ => {
          const el = document.createElement('textarea');
          el.value = colorLabel;
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
        }}
        style={{
          width: 50,
          height: 50,
          background: theme.palette[color][shade]
        }}
      />
      <SnackbarAlert open={open} onClose={_ => setOpen(false)}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          Colore copiato
          <Typography variant="caption">
            {colorLabel}
          </Typography>
        </Grid>
      </SnackbarAlert>
      {`-->${shade}`}
    </Grid>
  </>
}