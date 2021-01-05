export class PasswordControl{
  isPasswordWrongLength(password){
    return !(password.length >= 6 && password.length <= 16);
  }
  
  arePwWrong(password, confirmPassword){
    const isWrongLength = this.isPasswordWrongLength(password);
    const areDifferent = !(password === confirmPassword);
    const wrongPw = isWrongLength || areDifferent;

    return wrongPw;
  }
}