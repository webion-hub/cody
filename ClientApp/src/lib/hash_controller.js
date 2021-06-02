export class HashController{
  constructor(forbiddenPages){
    this.forbiddenPages = forbiddenPages;
  }

  static getHashValue = () => {
    const controller = this.setController()
    return controller.getHash()
  }

  static setController = () => {
    return new HashController(null)
  }

  addForbiddenPage = (hash, when) => {
    const forbiddenPages = {
      ...this.forbiddenPages,
      [hash]: when,
    }

    return new HashController(forbiddenPages);
  }

  trySetHash = () => {
    return new Promise((resolve, reject) => {
      const hashValue = this.getHash()
      const isForbidden = this.checkIfIsForbiddenPage(hashValue)

      if(isForbidden){
        reject()
        return
      }

      resolve(hashValue)
    })
  }

  checkIfIsForbiddenPage = (hashValue) => {
    if(!this.forbiddenPages)
      return false;
      
    return this.forbiddenPages[hashValue] ?? false
  }

  getHash = () => {
    const hash = window.location.hash
    return hash.replace('#', '')
  }  
}