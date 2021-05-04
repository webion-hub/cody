
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useTheme from '@material-ui/styles/useTheme';
import useMediaQuery  from '@material-ui/core/useMediaQuery';

import { Form } from 'src/lib/default_values/sizes/form_size';
import { RocketLaunch } from 'src/components/illustrations/illustrations/illustrations';


export function SignUpCompleted(){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
    >
      <RocketLaunch
        boxProps={{
          maxWidth: Form.width
        }}
      />
      <Typography
        variant={mobileView ? "h4" : "h3"}
      >
        Benvenuto
      </ Typography>
      <Typography
        variant={mobileView ? "h5" : "h4"}
      >
        in Cody
      </ Typography>
    </Grid>
  );
}