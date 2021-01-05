export class IDControl{
  isUsernameWrongLength(username){
    return !(username.length >= 4 && username.length <= 28);
  }

  isWrongUsername(username){
    return this.isUsernameWrongLength(username);
  }  

  isWrongNameSurname(val){
    let re = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+([ A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+)*$/;

    return val.length == 0 || re.test(val);
  }
}