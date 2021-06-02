import { FormatControllerBase } from '../format_controller_base';

export class WebsiteController extends FormatControllerBase{
  static wrongFormat = (website) => {
    const wrongLength = this.wrongLength(website, 'website')
      
    if(wrongLength)
      return true;

    const re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    return !re.test(website);
  }

  static check = (values, skip) => {
    const website = values.website

    if(this.canSkip(website, skip))
      return Promise.reject();

    return new Promise((resolve, reject) => {

      if(this.wrongFormat(website))
        resolve("websiteError");
      else {
        fetch(website, {mode: "no-cors"})
          .then(r => reject())
          .catch(_=> resolve("websiteError"))
      }
    })
  }
}

