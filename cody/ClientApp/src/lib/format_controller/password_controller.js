import zxcvbn from 'zxcvbn';
import { FormatLengthController } from 'src/lib/format_controller/format_length_controller'

export class PasswordController{
  wrongFormat(password){
    return FormatLengthController
      .set('password')
      .wrongFormat(password);
  }
  
  arePwWrong(password, confirmPassword){
    const isWrongLength = this.wrongFormat(password);
    const areDifferent = !(password === confirmPassword);
    const wrongPw = isWrongLength || areDifferent;

    return wrongPw;
  }
  
  checkPassword(password, confirmPassword, skip){
    if(skip)
      return new Promise(resolve => resolve('noError'));

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