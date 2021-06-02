import { FormatControllerBase } from "../format_controller_base";

export class TermsAndServiceController extends FormatControllerBase{ 
  static check(values, skip){
    const acceptTerms = values.acceptTerms

    if(this.canSkip(acceptTerms, skip))
      return Promise.reject();

    if(acceptTerms)
      return Promise.reject()

    return Promise.resolve('acceptTermsError')
  }
}