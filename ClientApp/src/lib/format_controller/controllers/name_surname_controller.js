import { FormatControllerBase } from '../format_controller_base';

export class NameSurnameController{
  constructor(type){
    this.type = type;
  }

  static setType = (type) => {
    return new NameSurnameController(type)
  }

  wrongFormat = (value) => {
    const wrongLength = FormatControllerBase
      .wrongLength(value, 'std')

    const re = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+([ A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+)*$/;
    const wrongId = value.length === 0 || !re.test(value)

    return wrongLength || wrongId
  }

  check = (values, skip) => {
    const nameOrSurname = this.type === 'name' 
      ? values.name
      : values.surname

    const errorType = this.type === 'name'
      ? 'nameError'
      : 'surnameError'

    if(FormatControllerBase.canSkip(nameOrSurname, skip))
      return Promise.reject();

    if(this.wrongFormat(nameOrSurname))
      return Promise.resolve(errorType)

    return Promise.reject()
  }
}