import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import { Form } from 'src/lib/default_values/sizes/form_size';

const useStyles = makeStyles((theme) => ({
  container: props => ({
    marginBottom: props.marginBottom
  }),
  flipImage: {
    transform: "scaleX(-1)",
  },
  children: {
    [theme.breakpoints.up('sm')]: {
      width: "50%"
    },
  }
}));

export function BasePhotoText(props) {
  const marginBottom = props.marginBottom
  const classes = useStyles({marginBottom});
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const image = props.image &&
    <props.image
      boxProps={{
        padding: props.imagePadding,
        maxWidth: Form.width,
        width: mobileView ? "100%" : "50%"
      }}
    />

  const flippedImage = 
    <div className={classes.flipImage}>
      {image}
    </div>

  const items = props.items.map((item, index) => 
    <Box 
      key={index}
      mb={props.margin}
      width="100%"
    >
      {item}
    </Box>
  );  

  return (
    <Grid
      container
      direction={props.direction}
      justify="center"
      alignItems="center"
    >
      {props.flipImage ? flippedImage : image}        
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.children}
        style={{maxWidth: Form.width}}
      >
        {items}
        {props.children}
      </Grid>
    </Grid>
  );
}

BasePhotoText.defaultProps = {
  items: [],
  direction: "row",
  imagePadding: 0
}