import { User } from 'src/lib/server_calls/user';
import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'
import { FormatControllerBase } from '../format_controller_base';


export class UsernameController extends FormatControllerBase{
  static usernameExist = (username) => {
    return User.existsWith({
      usernameOrEmail: username,
    });
  }

  static wrongFormat = (username) => {
    return this.wrongLength(username);
  } 

  static wrongLength = (username) => {
    return FormatLengthController
      .set('username')
      .wrongFormat(username, {skippable: false});
  }

  static check = (values, skip) => {
    const username = values.username

    if(this.canSkip(username, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {
      const wrongLenght = this.wrongLength(username);
      const wrongFormat = this.wrongFormat(username);

      if(wrongFormat || wrongLenght)
      {
        resolve("usernameError");
      }
      else {
        this
          .usernameExist(username)
          .then(result => {
            if(result) 
              resolve("usernameExist")
            else
              resolve()
          })
      }
    })
  }
}