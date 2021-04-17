export class UserOrganizationsController {
  constructor(event){
    this.event = event
  }

  /**
   * @param {('updateOrganizationMember' | 'updateBookmarkedOrganizations')} event 
   */
  
  static setEvent(event){
    return new UserOrganizationsController(event)
  }

  update = (value) => {
    const updateUserOrganizations = new CustomEvent(this.event, {detail: value});
    document.dispatchEvent(updateUserOrganizations)
  }

  listen = (eventFunction) => {
    document.addEventListener(this.event, eventFunction)
  }

  unListen = (eventFunction) => {
    document.removeEventListener(this.event, eventFunction)
  }
}