import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { PageController } from  'src/lib/page_controller' 

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paperSecondary
  }
}));

export default function CookieConsentSnackBar(props){
  const [visible, setVisible] = useState(false);
  const classes = useStyles();
  
  useEffect(_ => {
    const cookieName = props.cookieName;

    const consent = localStorage.getItem(cookieName);
    if (consent !== "true" || props.debug)
      setVisible(true);
  }, []);

  function handleAccept() {
    const {
      cookieName,
      onAccept,
    } = props;

    if (onAccept) {
      onAccept();
    }

    localStorage.setItem(cookieName, true);

    setVisible(false);
  };

  const {
    children,
    message,
    link,
    snackbarAnchor,
    acceptButtonLabel,
    actions,
  } = props;

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { onAccept: handleAccept }),
  );
  
  if(!visible)
    return null;  

  return children ? (
    <Snackbar anchorOrigin={snackbarAnchor} open={visible}>
      {childrenWithProps}
    </Snackbar> 
  ) : (
    <Snackbar
      anchorOrigin={snackbarAnchor}
      open={visible}
      ContentProps={{className: classes.container }}
      message={
        <Typography
          variant="subtitle1"
          color="textPrimary"
        >
          {message}
          <Link
            className={classes.link}
            onClick={e => PageController.push("/privacy-and-policy", e)}
            href="/privacy-and-policy"
            component="a"
            color="secondary"
          >
            {link}
          </Link>
        </Typography>
      }
      action={[
        ...React.Children.toArray(actions),
        <Button
          key="accept"
          color="secondary"
          size="small"
          onClick={handleAccept}
        >
          {acceptButtonLabel}
        </Button>,
      ]}
    />
  )
}

CookieConsentSnackBar.defaultProps = {
  hideOnAccept: true,
  snackbarAnchor: { horizontal: 'center', vertical: 'bottom' },
  children: null,
  acceptButtonLabel: 'Accetta',
  actions: null,
  link: ""
}