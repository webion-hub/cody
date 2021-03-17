import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'

export class WebsiteController{

  wrongFormat(website){
    const wrongLength = FormatLengthController
      .set('website')
      .wrongFormat(website, {skippable: true});
      
    if(wrongLength)
      return true;

    const re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    return !re.test(website);
  }

  checkWebsite(website, skip){
    if(skip)
      return new Promise(resolve => {resolve('noError')});
    return new Promise(resolve => {

      if(this.wrongFormat(website))
      {
        resolve("websiteError");
      }
      else {
        let url;
        fetch(url, {mode: "no-cors"})
          .then(r => resolve("correctWebsite"))
          .catch(_=> resolve("websiteError"))
      }
    })
  }
}