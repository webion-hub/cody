import { User } from '../user';

export class EmailController{

  emailExist(email){
    return User.existsWith({
      usernameOrEmail: email,
    });
  }
  
  wrongFormat(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //const re = /.+@.+\..{2,}/;
    return !re.test(email);
  }

  checkEmail(email){
    return new Promise(resolve => {

      if(this.wrongFormat(email))
      {
        resolve("emailError");
      }
      else {
        this.emailExist(email).then(
          result => {
            if(result)
              resolve("emailExist")
            else
              resolve("correctEmail")
          }
        )
      }
    })
  }
}