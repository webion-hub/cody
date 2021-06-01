import { formatLengths } from 'src/lib/format_controller/utilities/format_lengths'

export class FormatLengthController{
  constructor(type){
    this.settings = this.getLengths(type);
    this.max = this.settings.max;
    this.min = this.settings.min;
  }

  static set(type) {
    return new FormatLengthController(type);
  }

  getLengths(type){
    const length = {
      'username':     formatLengths.usernameLength,
      'generalName':  formatLengths.usernameLength,
      'std':          formatLengths.stdLength,
      'name':         formatLengths.stdLength,
      'surname':      formatLengths.stdLength,
      'location':     formatLengths.stdLength,
      'website':      formatLengths.stdLength,
      'email':        formatLengths.stdLength,
      'password':     formatLengths.passwordLength,
      'description':  formatLengths.descriptionLength
    }[type]

    return length
  }

  wrongFormat(value, {skippable}){
    const valueLength = value.length;

    if(!skippable){
      if(valueLength === 0)
        return true;
    }

    return valueLength > this.max || valueLength < this.min
  }
}