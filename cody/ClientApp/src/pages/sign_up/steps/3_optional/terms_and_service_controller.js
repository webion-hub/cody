
export class TermsAndServiceController{ 
    checkAll(values){
      return new Promise(resolve => {

        if(values.acceptTerms)
          resolve(['noError'])
        else
          resolve(['acceptTermsError'])
  
      })
    }
  }