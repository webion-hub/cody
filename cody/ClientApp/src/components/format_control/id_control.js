export class IDControl{
  isUsernameWrongLength(username){
    return !(username.length >= 4 && username.length <= 28);
  }

  isWrongUsername(username){
    let re = /[ `!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~éèçò°à§ù]/;

    return this.isUsernameWrongLength(username) || re.test(username);
  }  

  isWrongNameSurname(val){
    let re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    return val.length == 0 || re.test(val);
  }
}