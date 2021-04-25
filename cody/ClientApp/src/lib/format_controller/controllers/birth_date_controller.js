import { FormatControllerBase } from "../format_controller_base";

export class BirthDateController extends FormatControllerBase{
  static check = (values, skip) => {
    const birthDate = values.birthDate

    if(this.canSkip(birthDate, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {
      let re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

      const minDate = new Date('01/01/1920');
      const maxDate = new Date();
      const outOfRange = birthDate > maxDate || birthDate < minDate;

      const date = birthDate? birthDate.toLocaleDateString() : "";       

      const invalidFormat = !re.test(date);
      const empty = birthDate === null;

      const areErrors = outOfRange || invalidFormat || empty

      if(areErrors)
        resolve('birthDateError');
      else
        resolve()
    })
  }
}
