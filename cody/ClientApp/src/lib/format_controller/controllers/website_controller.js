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
      return new Promise(resolve => resolve());

    return new Promise(resolve => {

      if(this.wrongFormat(website))
      {
        resolve("websiteError");
      }
      else {
        let url;
        fetch(url, {mode: "no-cors"})
          .then(r => resolve())
          .catch(_=> resolve("websiteError"))
      }
    })
  }
}

