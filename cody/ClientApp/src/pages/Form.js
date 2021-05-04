import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';

const useStyles = makeStyles((theme) => ({
  form: {
    background: "#e4e4e4",
    textAlign: "center",
    width: "100%",
    height: `calc(100vh - ${theme.appBar.fullHeight}px)`,
    [theme.breakpoints.down('xs')]: {
      height: `calc(100vh - ${theme.appBar.mobileHeight}px)`,
    },
  }
}));

export default function Form(){
  const classes = useStyles();

  return(
    <CenterComponentPageBase>
      <iframe className={classes.form} src="https://docs.google.com/forms/d/e/1FAIpQLSe1JEJpodmxtn8aPvdpDkuVxerhawhjxu_7Cv_jL2KI5VGLTg/viewform?embedded=true" frameborder="0" marginheight="0" marginwidth="0">
        <div id="ringContainer" className="center dynamic-background">
          <div className="loader"></div>
        </div>
      </iframe>
    </CenterComponentPageBase>
  );
}
