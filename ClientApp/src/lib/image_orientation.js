import exif from 'exif-js';

export class ImageOrientation {

  readFile = (file) => {
    return new Promise(resolve => {
      const reader = new FileReader();

      reader.onloadend = (event) => {
        resolve(event.target.result)
      }

      reader.readAsDataURL(file);
    });
  };
  
  createImage = (file) => {
    return new Promise(resolve => {
      const img = document.createElement('img');

      img.onload = () => {
        resolve(img)
      }

      img.src = file;
    })
  }
  
  rotate = (img) => {
    return new Promise(resolve => {
      const canvas = document.createElement('canvas');
  
      exif.getData(img, function () {
        const orientation = exif.getAllTags(this).Orientation;
  
        if ([5, 6, 7, 8].indexOf(orientation) > -1) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
  
        const ctx = canvas.getContext("2d");
  
        switch (orientation) {
          case 2:
            ctx.transform(-1, 0, 0, 1, img.width, 0);
            break;
          case 3:
            ctx.transform(-1, 0, 0, -1, img.width, img.height);
            break;
          case 4:
            ctx.transform(1, 0, 0, -1, 0, img.height);
            break;
          case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
          case 6:
            ctx.transform(0, 1, -1, 0, img.height, 0);
            break;
          case 7:
            ctx.transform(0, -1, -1, 0, img.height, img.width);
            break;
          case 8:
            ctx.transform(0, -1, 1, 0, 0, img.width);
            break;
          default:
            ctx.transform(1, 0, 0, 1, 0, 0);
        }
  
        ctx.drawImage(img, 0, 0, img.width, img.height);
  
        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
              resolve(reader.result)
            }
        })
      });
    })
  }

  fixOrientation = (file) => {
    return new Promise(resolve => {
      const isBrowserSupportingImageOrientation = 
        CSS.supports("image-orientation","from-image") 

      if(isBrowserSupportingImageOrientation){
        this.readFile(file)
          .then(img => resolve(img))        
      }
      else
      {
        this.readFile(file)
        .then(this.createImage)
        .then(res => this.rotate(res))
        .then(blob => resolve(blob))
      }
    })
  }
}

