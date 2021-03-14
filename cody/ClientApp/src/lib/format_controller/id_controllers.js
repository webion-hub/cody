import { User } from 'src/lib/user';
import { FormatLengthController } from 'src/lib/format_controller/format_length_controller'


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
    return FormatLengthController
      .set('username')
      .wrongFormat(username, {skippable: false});
  }

  checkUsername(username, skip){
    if(skip)
      return new Promise(resolve => {resolve('noError')});

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
              resolve("correctUsername")
          })
      }
    })
  }
}

export class NameSurnameController{
  checkNameSurname(val, skip){
    if(skip)
      return new Promise(resolve => {resolve(null)});

    return new Promise(resolve => {
      const wrongLength = FormatLengthController
        .set('std')
        .wrongFormat(val, {skippable: false});

      if(wrongLength)
        resolve(true)

      let re = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+([ A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+)*$/;
      const wrongId = val.length === 0 || !re.test(val)
      
      resolve(wrongId);
    })
  }
}

export class BirthDateController{
  checkBirthDate(val, skip){
    if(skip)
      return new Promise(resolve => {resolve(null)});

    return new Promise(resolve => {
      let re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

      const minDate = new Date('01/01/1920');
      const maxDate = new Date();
      const outOfRange = val > maxDate || val < minDate;

      const date = val? val.toLocaleDateString() : "";       

      const invalidFormat = !re.test(date);
      const empty = val === null;

      const areErrors = outOfRange || invalidFormat || empty

      resolve(areErrors);
    })
  }
}
