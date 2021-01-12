export class PasswordController{
  isPasswordWrongLength(password){
    return !(password.length >= 8 && password.length <= 128);
  }
  
  arePwWrong(password, confirmPassword){
    const isWrongLength = this.isPasswordWrongLength(password);
    const areDifferent = !(password === confirmPassword);
    const wrongPw = isWrongLength || areDifferent;

    return wrongPw;
  }
  
  checkPassword(password, confirmPassword){
    return new Promise(resolve => {
      const pwError = this.arePwWrong(password, confirmPassword)
      resolve(pwError);
    });
  }

  pwStrength(password){
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    
    if(strongRegex.test(password))
      return 100;
    else if(mediumRegex.test(password))
      return 50;
    else if(password == 0)
      return 0;
    else 
      return 10;
  }
}