import { PasswordController } from '../../../../lib/format_controller/password_controller';
import { EmailController } from '../../../../lib/format_controller/email_controller';

export class EmailPasswordController{

    removeNoError(array){
      const index = array.indexOf("noError");
      if (index >= 0) {
        array.splice(index, 1);
      }
  
      return array;
    }
  
    checkAll(values){
      return new Promise(resolve => {
        const emailController = new EmailController();
        const passwordController = new PasswordController();
  
        const email = values.email;
        const password = values.password;
        const confirmPassword = values.confirmPassword;
  
        let errorsList = ["noError"];
  
        Promise.all([
          emailController.checkEmail(email)
          .then(
            result => {
              if(result !== "correctEmail") {
                errorsList.push(result);
                errorsList = this.removeNoError(errorsList);
              }
            },
          ),
          passwordController.checkPassword(password, confirmPassword)
          .then(
            result => {
              if(result) {
                errorsList.push("passwordError");
                errorsList = this.removeNoError(errorsList);
              }
            },
          ),
        ])
        .then(_ => {
          resolve(errorsList);
        });
      })
    }
  }