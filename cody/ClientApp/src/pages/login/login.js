import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Images } from 'src/lib/default_values/images/images';

import { CenterComponentPageBase } from 'src/components/bases/layouts/center_component_page_base';
import { PageController } from 'src/lib/page_controller';
import { PaperWithWaves } from 'src/components/bases/papers/paper_with_waves';
import LoginBox from './components/login_box';
import { Color } from 'src/lib/color/color';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: 632,
    width: "100%",
  },
  createAccount: {
    margin: theme.spacing(1),
    backdropFilter: "blur(10px)",
    background: Color.o(theme.palette.background[750], 0.3),
    color: "rgba(255,255,255,0.9)",
  },
  pageContainer: {
    backgroundImage: `url(${Images.forestImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center"
  }
}));

export default function Login(){
	const classes = useStyles();

  return (
    <CenterComponentPageBase
      className={classes.pageContainer}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <PaperWithWaves className={classes.paper}>
          <LoginBox
            notUpdateLoading
          />
        </PaperWithWaves> 
        <Button
          className={classes.createAccount}
          endIcon={<ArrowForwardIcon/>}
          href='/sign-up'
          onClick={(e) => PageController.push('/sign-up', e)}
        >
          Crea un account
        </Button>
      </Grid>
    </CenterComponentPageBase>
  );
}
