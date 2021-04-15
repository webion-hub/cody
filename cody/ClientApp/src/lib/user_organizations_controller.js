export class UserOrganizationsController {
  static update = () => {
    const updateUserOrganizations = new Event('updateUserOrganizations');
    document.dispatchEvent(updateUserOrganizations)
  }

  static listen = (eventFunction) => {
    document.addEventListener('updateUserOrganizations', eventFunction)
  }

  static unListen = (eventFunction) => {
    document.removeEventListener('updateUserOrganizations', eventFunction)
  }
}