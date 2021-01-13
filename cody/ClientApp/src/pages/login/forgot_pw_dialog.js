
import React, { Component } from 'react';

import { Box, Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { LoadingButton } from '../../components/loading_button';

import { Form } from '../../lib/default_values/sizes/form_size';
import { EmailController } from '../../lib/format_controller/email_controller';

export class ForgotPasswordDialog extends Component {
  constructor(props){
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.tryEmail = this.tryEmail.bind(this);

    this.state = {
      loading: false,
      email: '',
      emailNotExist: false,
      emailWrongFormat: false,

      success: false,
    }
  }
  
  handleClose(){
    this.setState({
      loading: false,
      email: '',
      emailNotExist: false,
      emailWrongFormat: false,
      success: false,
    });
    const {onClose} = this.props;
    onClose(false);
  }

  getEmail = (event) => {
    this.setState({email: event.target.value });
  }

  tryEmail(){
    const emailController = new EmailController();
    const email = this.state.email;
    this.setState({
      loading: true,
      emailNotExist: false,      
      emailWrongFormat: false,
    });

    emailController.checkEmail(email)
    .then(
      result => {
        this.setState({loading: false});
        if(result === "emailError")
          this.setState({emailWrongFormat: true});
        else if(result !== "emailExist")
          this.setState({emailNotExist: true});
        else  
          this.setState({success: true});
      }  
    );
  }

  render(){
    return(
      <Dialog
        maxWidth="xl"
        open={this.props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Password dimenticata?"}</DialogTitle>
        <DialogContent>
          <Typography
            variant="subtitle1"
          >
            Inserisci la tua email, ti invieremo un link per cambiare password.
          </Typography>
          <Box mt={2}>
            <TextField
              id="registration_email"
              label="Email"
              variant="outlined"
              color="secondary"
              disabled={this.state.success}
              fullWidth={true}
              required={true}
              onChange={this.getEmail}
              error={this.state.emailNotExist || this.state.emailWrongFormat}
            />
            <Box
              textAlign="right"
            >
              <Fade
                in={this.state.emailNotExist}
              >
                <Typography
                  variant="caption"
                  color="error"
                >
                  L'email non è registrata!
                </Typography>
              </Fade>
            </Box> 
          </Box>
          <Fade
            in={this.state.success}
            disableStrictModeCompat={true}
          >
            <Alert severity="success">Controlla la tua email, per resettare la password.</Alert>
          </Fade>          
        </DialogContent>
        <DialogActions>
          <Fade
            in={!this.state.success}
          >
            <Button 
              onClick={this.handleClose}
              color="secondary"
            >
              Chiudi
            </Button>
          </Fade>
          <LoadingButton
            loading={this.state.loading}
            onClick={this.state.success ? this.handleClose : this.tryEmail}
            href="/"
            label={this.state.success ? "Chiudi" : "Conferma"}
          />
        </DialogActions>
      </Dialog>
    )
  }
}
