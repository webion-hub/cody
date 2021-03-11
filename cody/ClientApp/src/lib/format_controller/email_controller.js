import { User } from 'src/lib/user';

export class EmailController{

  emailExist(email){
    return User.existsWith({
      usernameOrEmail: email,
    });
  }
  
  wrongFormat(email){
    if(email.length > 256)
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