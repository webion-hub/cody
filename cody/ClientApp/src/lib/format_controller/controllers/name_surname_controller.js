import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'
import { FormatControllerBase } from '../format_controller_base';

export class NameSurnameController{
  constructor(type){
    this.type = type;
  }

  static setType = (type) => {
    return new NameSurnameController(type)
  }

  check = (values, skip) => {
    const nameOrSurname = this.type === 'name' 
      ? values.name
      : values.surname

    const errorType = this.type === 'name'
      ? 'nameError'
      : 'surnameError'

    if(FormatControllerBase.canSkip(nameOrSurname, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {
      const wrongLength = FormatLengthController
        .set('std')
        .wrongFormat(nameOrSurname, {skippable: false});

      if(wrongLength)
        resolve(errorType)

      let re = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+([ A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+)*$/;
      const wrongId = nameOrSurname.length === 0 || !re.test(nameOrSurname)
      
      if(wrongId)
        resolve(errorType);
      else
        resolve()
    })
  }
}