import { UsernameController, NameSurnameController, BirthDateController } from 'src/lib/format_controller/id_controllers';

export class IDController{

    removeNoError(array){
      const index = array.indexOf("noError");
      if (index >= 0) {
        array.splice(index, 1);
      }
      return array;
    }
  
    checkAll(values){
      return new Promise(resolve => {
        const usernameController = new UsernameController();
        const nameSurnameController = new NameSurnameController();
        const birthDateController = new BirthDateController();
  
        const username = values.username;
        const name = values.name;
        const surname = values.surname;
        const birthDate = values.birthDate;
  
        let errorsList = ["noError"];
  
        Promise.all([
          usernameController
            .checkUsername(username, false)
            .then(
              result => {
                if(result !== "correctUsername") {
                  errorsList.push(result);
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),
    
          nameSurnameController
            .checkNameSurname(name, false)
            .then(
              result => {
                if(result) {
                  errorsList.push("nameError");
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),
    
          nameSurnameController
            .checkNameSurname(surname, false)
            .then(
              result => {
                if(result) {
                  errorsList.push("surnameError");
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),

          birthDateController
            .checkBirthDate(birthDate, false, "date")
            .then(
              result => {
                if(result) {
                  errorsList.push("birthDateError");
                  errorsList = this.removeNoError(errorsList);
                }
              }
            )
        ])
        .then(_ => {
          resolve(errorsList);
        });
      })
    }
  }