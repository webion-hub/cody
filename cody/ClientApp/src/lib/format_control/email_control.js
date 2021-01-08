import { User } from '../user';

export class EmailControl{
  emailError(email){
    console.log(email);
    User.existsWith(email).then(res => {
      if (res) console.log('esiste');
      else console.log('non esiste');
    });
  }
  
  isEmailWrong(email){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    this.emailError(email);
    return !re.test(email);
  }
}