import { User } from 'src/lib/server_calls/user';
import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'

export class EmailController{

  emailExist(email){
    return User.existsWith({
      usernameOrEmail: email,
    });
  }
  
  wrongFormat(email){
    const wrongLength = FormatLengthController
      .set('email')
      .wrongFormat(email, {skippable: false})

    if(wrongLength)
      return true;
      
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
  }

  checkEmail(email, skip){
    if(skip)
      return new Promise(resolve => {resolve('noError')});
    return new Promise(resolve => {

      if(this.wrongFormat(email))
      {
        resolve("emailError");
      }
      else {
        this
          .emailExist(email)
          .then(result => {
            if(result)
              resolve("emailExist")
            else
              resolve("correctEmail")
          });
      }
    })
  }
}