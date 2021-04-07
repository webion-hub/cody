import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';


export default class MUICookieConsent extends React.Component {
  static defaultProps = {
    hideOnAccept: true,
    snackbarAnchor: { horizontal: 'center', vertical: 'bottom' },
    children: null,
    message: 'You accept cookies for this website',
    acceptButtonLabel: 'Accetta',
    actions: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const cookieName = this.props.cookieName;

    const consent = localStorage.getItem(cookieName);
    if (consent !== "true" || this.props.debug) {
      this.setState({ visible: true });
    }
  }

  handleAccept = () => {
    const {
      cookieName,
      hideOnAccept,
      onAccept,
    } = this.props;

    if (onAccept) {
      onAccept();
    }

    localStorage.setItem(cookieName, true);

    if (hideOnAccept) {
      this.setState({ visible: false });
    }
  };

  render() {
    const {
      children,
      message,
      snackbarAnchor,
      acceptButtonLabel,
      actions,
    } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { onAccept: this.handleAccept }),
    );

    
  return children ? (
    <Snackbar anchorOrigin={snackbarAnchor} open={this.state.visible}>
      {childrenWithProps}
    </Snackbar> ) : (
    <Snackbar
      anchorOrigin={snackbarAnchor}
      open={this.state.visible}
      message={<span>{message}</span>}
      action={[
        ...React.Children.toArray(actions),
        <Button
          key="accept"
          color="secondary"
          size="small"
          onClick={this.handleAccept}
        >
          {acceptButtonLabel}
        </Button>,
      ]}
    />
  )}
}