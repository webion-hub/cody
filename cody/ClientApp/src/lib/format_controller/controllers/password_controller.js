import zxcvbn from 'zxcvbn';
import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'
import { FormatControllerBase } from '../format_controller_base';

export class PasswordController extends FormatControllerBase{
  static wrongFormat = (password) => {
    return FormatLengthController
      .set('password')
      .wrongFormat(password, {skippable: false});
  }
  
  static arePwWrong = (password, confirmPassword) => {
    const isWrongLength = this.wrongFormat(password);
    const areDifferent = !(password === confirmPassword);
    const wrongPw = isWrongLength || areDifferent;

    return wrongPw;
  }
  
  static check = (values, skip) => {
    const {password, confirmPassword} = values;

    if(this.canSkip(password, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {
      const pwError = this.arePwWrong(password, confirmPassword)
      if(pwError)
        resolve("passwordError")
      else
        resolve();
    });
  }

  static pwStrength = (password) => {
    const evaluation = zxcvbn(password);
    const score = evaluation.score;

    return score*25;
  }
}