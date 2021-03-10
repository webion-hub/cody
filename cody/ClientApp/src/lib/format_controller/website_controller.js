export class WebsiteController{

  wrongFormat(website){

      
    if(website.length > 256)
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
        if(website.startsWith('http'))
          url = website;
        else
          url = `https://${website}`

          fetch(url, {mode: "no-cors"})
          .then(r => {resolve("correctWebsite")
        })
          .catch(_=> resolve("websiteError"))
      }
    })
  }
}