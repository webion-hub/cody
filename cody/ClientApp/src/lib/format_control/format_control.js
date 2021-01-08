import { PasswordControl } from './password_control'
import { EmailControl } from './email_control'
import { IDControl } from './id_control'

export class FormatControl { 

  areErrorsPWEmail(password, confirmPassword, email){
    const pwControl = new PasswordControl();
    const emailControl = new EmailControl();

    const wrongPw = pwControl.arePwWrong(password, confirmPassword);
    
    const wrongEmail = emailControl.isEmailWrong(email);

    return wrongPw || wrongEmail;
  }
  
  areErrorsId(username, name, surname){
    const idControl = new IDControl();

    const wrongUsername = idControl.isWrongUsername(username);
    const wrongName = idControl.isWrongNameSurname(name);
    const wrongSurname = idControl.isWrongNameSurname(surname); 

    return wrongUsername || wrongName || wrongSurname;
  }


}