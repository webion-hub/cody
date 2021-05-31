import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PageController } from 'src/lib/page_controller';
import { CenterComponentPageBase } from 'src/components/bases/layouts/center_component_page_base';
import { PaperWithWaves } from '../papers/paper_with_waves';
import { LoadingButton } from '../../buttons/loading_button';

const useStyles = makeStyles((theme) => ({
	paper: {
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(3),
	},
  button: {
    marginTop: theme.spacing(2),
    width: 200,
    margin: "0 auto",
    display: "flex",
  }
}));

export function MessagePageBase(props) {
	const classes = useStyles();
  const onClick = props.onClick ? props.onClick : (e) => PageController.push(props.href, e)

  return (
    <CenterComponentPageBase>
      <PaperWithWaves className={classes.paper}>
        <props.image
          boxProps={{
            maxWidth: 500,
            size: "100%",
            margin: "0 auto"
          }}
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
        {
          props.buttonLabel && 
            <LoadingButton
              loading={props.loading}
              className={classes.button}
              color="primary"
              variant="contained"
              href={props.href}
              onClick={onClick}
              fullWidth
              label={props.buttonLabel}
            />
        }
      </PaperWithWaves>
    </CenterComponentPageBase>
  );
}
