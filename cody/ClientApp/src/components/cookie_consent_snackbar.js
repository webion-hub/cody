import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PageController } from  'src/lib/page_controller' 

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "var(--background-color)"
  },
  link: {
    textDecoration: "none",
    color: "#4175DC",
    cursor: "pointer"
  }
}));

export default function MUICookieConsent(props){
  const [visible, setVisible] = useState(false);
  const styles = useStyles();
  
  useEffect(_ => {
    const cookieName = props.cookieName;

    const consent = localStorage.getItem(cookieName);
    if (consent !== "true" || props.debug)
      setVisible(true);
  });

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

  function handleLinkClick() {
    PageController.push("/privacy-and-policy");
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
  
  if(visible)
    return children ? (
      <Snackbar anchorOrigin={snackbarAnchor} open={visible}>
        {childrenWithProps}
      </Snackbar> 
    ) : (
      <Snackbar
        anchorOrigin={snackbarAnchor}
        open={visible}
        ContentProps={{className: styles.container }}
        message={
          <Typography
            variant="subtitle1"
            color="textPrimary"
          >
          {message}
          <a 
            className={styles.link}
            onClick={handleLinkClick}
          >
            {link}
          </a>
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
  else return null;
}

MUICookieConsent.defaultProps = {
  hideOnAccept: true,
  snackbarAnchor: { horizontal: 'center', vertical: 'bottom' },
  children: null,
  acceptButtonLabel: 'Accetta',
  actions: null,
  link: ""
}