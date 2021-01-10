import { UsernameController, NameSurnameController } from '../../../../lib/format_controller/id_controllers';

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
  
        const username = values.username;
        const name = values.name;
        const surname = values.surname;
  
        let errorsList = ["noError"];
  
        Promise.all([
          usernameController
            .checkUsername(username)
            .then(
              result => {
                if(result != "correctUsername") {
                  errorsList.push(result);
                  errorsList = this.removeNoError(errorsList);
                }            
              },
            ),
    
          nameSurnameController
            .checkNameSurname(name)
            .then(
              result => {
                if(result) {
                  errorsList.push("nameError");
                  errorsList = this.removeNoError(errorsList);
                }
              },
            ),
    
          nameSurnameController
            .checkNameSurname(surname)
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
  
  