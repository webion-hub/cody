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
        <Co shade='shade1' color='background'/>
        <Co shade='shade2' color='background'/>
        <Co shade='shade3' color='background'/>
        <Co shade='shade4' color='background'/>

        <Co shade='default' color='background'/>

        <Co shade='shade5' color='background'/>
        <Co shade='shade6' color='background'/>
        <Co shade='shade7' color='background'/>
        <Co shade='shade8' color='background'/>
      </div>


      <div>
        primary
        <Co shade='shade1' color='primary'/>
        <Co shade='shade2' color='primary'/>
        <Co shade='shade3' color='primary'/>
        <Co shade='shade4' color='primary'/>

        <Co shade='main' color='primary'/>

        <Co shade='shade5' color='primary'/>
        <Co shade='shade6' color='primary'/>
        <Co shade='shade7' color='primary'/>
        <Co shade='shade8' color='primary'/>
      </div>


      <div>
        secondary
        <Co shade='shade1' color='secondary'/>
        <Co shade='shade2' color='secondary'/>
        <Co shade='shade3' color='secondary'/>
        <Co shade='shade4' color='secondary'/>

        <Co shade='main' color='secondary'/>

        <Co shade='shade5' color='secondary'/>
        <Co shade='shade6' color='secondary'/>
        <Co shade='shade7' color='secondary'/>
        <Co shade='shade8' color='secondary'/>
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