import { FormatControllerBase } from "../format_controller_base";

export class TermsAndServiceController extends FormatControllerBase{ 
  static check(values, skip){
    const acceptTerms = values.acceptTerms

    if(this.canSkip(acceptTerms, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {

      if(acceptTerms)
        resolve()
      else
        resolve('acceptTermsError')

    })
  }
}