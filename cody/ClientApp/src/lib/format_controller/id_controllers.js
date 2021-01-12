import { User } from '../user';


export class UsernameController{
  usernameExist(email){
    return User.existsWith({
      usernameOrEmail: email,
    });
  }

  wrongFormat(username){
    return this.wrongLength(username);
  } 

  wrongLength(username){
    return !(username.length >= 4 && username.length <= 28);
  }

  checkUsername(username){
    return new Promise(resolve => {
      const wrongLenght = this.wrongLength(username);
      const wrongFormat = this.wrongFormat(username);

      if(wrongFormat || wrongLenght)
      {
        resolve("usernameError");
      }
      else {
        this.usernameExist(username).then(
          result => {
            if(result) 
              resolve("usernameExist")
            else
              resolve("correctUsername")
          }
        )
      }
    })
  }
}

export class NameSurnameController{
  checkNameSurname(val){
    return new Promise(resolve => {
      let re = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+([ A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+)*$/;
      const wrongId = val.length == 0 || !re.test(val)
      
      resolve(wrongId);
    })
  }
}
