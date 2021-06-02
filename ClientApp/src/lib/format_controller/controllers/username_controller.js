import { User } from 'src/lib/server_calls/user';
import { FormatControllerBase } from '../format_controller_base';

export class UsernameController extends FormatControllerBase{
  static wrongFormat = (username) => {
    const wrongLength = this.wrongLength(username, 'username')
      
    const usernameRegex = /^/;
    return wrongLength || !usernameRegex.test(username);
  }

  static check = async (values, skip) => {
    const username = values.username

    if(this.canSkip(username, skip))
      return Promise.reject();

    if(this.wrongFormat(username))
      return Promise.resolve("usernameError")
      
    return await this
      .valueExist({
        promise: User.existsWith({
          usernameOrEmail: username,
        }),
        errorLabel: "usernameExist"
      })
  }
}