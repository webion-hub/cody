import { User } from 'src/lib/server_calls/user';
import { FormatControllerBase } from '../format_controller_base';

export class EmailController extends FormatControllerBase {
  static wrongFormat = (email) => {
    const wrongLength = this.wrongLength(email, 'email')

    if(wrongLength)
      return true;
      
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
  }

  static check = async (values, skip) => {
    const email = values.email;

    if(this.canSkip(email, skip))
      return Promise.reject();

    if(this.wrongFormat(email))
      return Promise.resolve("emailError");

    return await this
      .valueExist({
        promise: User.existsWith({
          usernameOrEmail: email,
        }),
        errorLabel: "emailExist"
      })
  }
}