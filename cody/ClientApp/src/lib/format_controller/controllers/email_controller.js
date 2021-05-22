import { User } from 'src/lib/server_calls/user';
import { FormatControllerBase } from '../format_controller_base';

export class EmailController extends FormatControllerBase {
  static emailExist = (email) => {
    return User.existsWith({
      usernameOrEmail: email,
    });
  }
  
  static wrongFormat = (email) => {
    const wrongLength = this.wrongLength(email, 'email')

    if(wrongLength)
      return true;
      
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
  }

  static check = (values, skip) => {
    const email = values.email;

    if(this.canSkip(email, skip))
      return Promise.resolve();

    if(this.wrongFormat(email))
      return Promise.resolve("emailError");


    return this
      .emailExist(email)
      .then(result => result ? 
          "emailExist" : undefined
      );
  }
}