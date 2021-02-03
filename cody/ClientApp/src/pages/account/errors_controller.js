import { EmailController } from 'src/lib/format_controller/email_controller'
import { UsernameController, NameSurnameController } from 'src/lib/format_controller/id_controllers'

export class ErrorsController{

    removeNoError(array){
      const index = array.indexOf("noError");
      if (index >= 0) {
        array.splice(index, 1);
      }
  
      return array;
    }
  
    checkAll(values, oldValues){
      return new Promise(resolve => {
        const emailController = new EmailController();
        const usernameController = new UsernameController();
        const nameSurnameController = new NameSurnameController();
  
        const email = values.email;
        const username = values.username;
        const name = values.name;
        const surname = values.surname;

        const skipEmail = oldValues.email === email;
        const skipUsername = oldValues.username === username;
        const skipName = oldValues.name === name;
        const skipSurname = oldValues.surname === surname;

        let errorsList = ["noError"];  
        Promise.all([
          emailController
            .checkEmail(email, skipEmail)
            .then(
              result => {
                if(result !== "correctEmail") {
                  errorsList.push(result);
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),
          usernameController
            .checkUsername(username, skipUsername)
            .then(
              result => {
                if(result !== "correctUsername") {
                  errorsList.push(result);
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),    
          nameSurnameController
            .checkNameSurname(name, skipName)
            .then(
              result => {
                if(result) {
                  errorsList.push("nameError");
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),    
          nameSurnameController
            .checkNameSurname(surname, skipSurname)
            .then(
              result => {
                if(result) {
                  errorsList.push("surnameError");
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