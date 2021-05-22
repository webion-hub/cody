import zxcvbn from 'zxcvbn';
import { FormatControllerBase } from '../format_controller_base';

export class PasswordController extends FormatControllerBase{
  
  static arePwWrong = (password, confirmPassword) => {
    const isWrongLength = this.wrongLength(password, 'password');
    const areDifferent = !(password === confirmPassword);
    const wrongPw = isWrongLength || areDifferent;

    return wrongPw;
  }
  
  static check = (values, skip) => {
    const {password, confirmPassword} = values;

    if(this.canSkip(password, skip))
      return Promise.reject();

    if(this.arePwWrong(password, confirmPassword))
      return Promise.resolve("passwordError")

    return Promise.reject();
  }

  static pwStrength = (password) => {
    const evaluation = zxcvbn(password);
    const score = evaluation.score;

    return score*25;
  }
}