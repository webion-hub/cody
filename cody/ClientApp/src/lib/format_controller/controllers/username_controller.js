import { User } from 'src/lib/server_calls/user';
import { FormatControllerBase } from '../format_controller_base';


export class UsernameController extends FormatControllerBase{
  static usernameExist = (username) => {
    return User.existsWith({
      usernameOrEmail: username,
    });
  }

  static wrongFormat = (username) => {
    const wrongLength = this.wrongLength(username, 'username')

    if(wrongLength)
      return true;
      
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return !usernameRegex.test(username);
  }

  static check = (values, skip) => {
    const username = values.username

    if(this.canSkip(username, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {
      const wrongFormat = this.wrongFormat(username);


      if(wrongFormat)
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