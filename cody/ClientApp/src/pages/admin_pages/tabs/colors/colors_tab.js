import { Grid, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SnackbarAlert from 'src/components/snackbars/snackbar_alert';
import { Color } from 'src/lib/color/color';

export default function ColorsTab() {
  const theme = useTheme()

  return (
    <Grid
      style={{
        background: Color.o(theme.palette.background.contrastText, 0.8),
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
        <Co shade='100' color='background'/>
        <Co shade='200' color='background'/>
        <Co shade='300' color='background'/>
        <Co shade='400' color='background'/>
        <Co shade='500' color='background'/>
        <Co shade='550' color='background'/>
        <Co shade='600' color='background'/>
        <Co shade='650' color='background'/>
        <Co shade='700' color='background'/>
        <Co shade='750' color='background'/>
        <Co shade='800' color='background'/>
        <Co shade='900' color='background'/>
      </div>


      <div>
        primary
        <Co shade='100' color='primary'/>
        <Co shade='200' color='primary'/>
        <Co shade='300' color='primary'/>
        <Co shade='400' color='primary'/>
        <Co shade='500' color='primary'/>
        <Co shade='550' color='primary'/>
        <Co shade='600' color='primary'/>
        <Co shade='650' color='primary'/>
        <Co shade='700' color='primary'/>
        <Co shade='750' color='primary'/>
        <Co shade='800' color='primary'/>
        <Co shade='900' color='primary'/>
      </div>


      <div>
        secondary
        <Co shade='100' color='secondary'/>
        <Co shade='200' color='secondary'/>
        <Co shade='300' color='secondary'/>
        <Co shade='400' color='secondary'/>
        <Co shade='500' color='secondary'/>
        <Co shade='550' color='secondary'/>
        <Co shade='600' color='secondary'/>
        <Co shade='650' color='secondary'/>
        <Co shade='700' color='secondary'/>
        <Co shade='750' color='secondary'/>
        <Co shade='800' color='secondary'/>
        <Co shade='900' color='secondary'/>
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

  const colorLabel = `theme.palette.${color}[${shade}]`

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