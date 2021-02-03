import zxcvbn from 'zxcvbn';

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
  
  checkPassword(password, confirmPassword, skip){
    if(skip)
      return new Promise(resolve => {resolve('noError')});

    return new Promise(resolve => {
      const pwError = this.arePwWrong(password, confirmPassword)
      resolve(pwError);
    });
  }

  pwStrength(password){
    const evaluation = zxcvbn(password);
    const score = evaluation.score;

    return score*25;
  }
}