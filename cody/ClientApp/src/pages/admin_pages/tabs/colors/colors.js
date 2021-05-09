import { Grid, useTheme } from '@material-ui/core';

export default function Colors() {
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
        <Co shade='dark3' color='background'/>
        <Co shade='dark2' color='background'/>
        <Co shade='dark1' color='background'/>
        <Co shade='default' color='background'/>

        <Co shade='light1' color='background'/>
        <Co shade='light2' color='background'/>
        <Co shade='light3' color='background'/>
      </div>


      <div>
        primary
        <Co shade='dark3' color='primary'/>
        <Co shade='dark2' color='primary'/>
        <Co shade='dark1' color='primary'/>
        <Co shade='main' color='primary'/>
        <Co shade='light1' color='primary'/>
        <Co shade='light2' color='primary'/>
        <Co shade='light3' color='primary'/>
      </div>


      <div>
        secondary
        <Co shade='dark3' color='secondary'/>
        <Co shade='dark2' color='secondary'/>
        <Co shade='dark1' color='secondary'/>
        <Co shade='main' color='secondary'/>
        <Co shade='light1' color='secondary'/>
        <Co shade='light2' color='secondary'/>
        <Co shade='light3' color='secondary'/>
      </div>

    </Grid>

  );
}

function Co(props){
  const theme = useTheme()

  const {
    shade,
    color
  } = props

  return <>
    <Grid
      container
      direction="row"
      alignItems="center"
    >
      <div
        onClick={_ => {
          const el = document.createElement('textarea');
          el.value = `theme.palette.${color}.${shade}`;
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
      {`\t-->${shade}`}
    </Grid>
  </>
}