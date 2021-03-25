import history from 'src/history'

export class PageController {

  static disableHref = (event) => {
    event.preventDefault()
  }

  static push = (url, event) => {
    if(event !== undefined)
      event.preventDefault()
    history.push(url)
    window.scrollTo(0, 0)
  }

  static pushAndRefresh = (url, event) => {
    this.push(url, event)
    history.go(0)
  }

  static refresh = () => {
    history.go(0)
  }

  static goBack = (event) => {
    if(event !== undefined)
      event.preventDefault()
    history.goBack()
  }

  static updateHash = (hash, event) => {
    if(event !== undefined)
      event.preventDefault()
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}