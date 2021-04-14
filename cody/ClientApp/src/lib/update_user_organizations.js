export class UserOrganizationsController {
  static update = () => {
    const updateUserOrganizations = new Event('updateUserOrganizations');
    document.dispatchEvent(updateUserOrganizations)
  }

  static addListener = (eventFunction) => {
    document.addEventListener('updateUserOrganizations', eventFunction)
  }

  static removeListener = (eventFunction) => {
    document.removeEventListener('updateUserOrganizations', eventFunction)
  }
}