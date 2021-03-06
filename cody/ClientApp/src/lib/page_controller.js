import history from 'src/history'

export class PageController {

  static disableHref = (event) => {
    event.preventDefault()
  }

  static push = (url, event) => {
    if(event !== undefined)
      event.preventDefault()
    history.push(url)
  }

  static pushAndRefresh = (url, event) => {
    this.push(url, event)
    history.go(0)
  }

  static refresh = () => {
    history.go(0)
  }

}