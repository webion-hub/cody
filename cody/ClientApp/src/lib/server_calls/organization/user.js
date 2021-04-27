import Requests from "../requests";


export default class User {
  /**
   * @param {number} organizationId 
   */
  static of(organizationId) {
    return new User(organizationId);
  }

  /**
   * @param {number} organizationId 
   */
  constructor(organizationId) {
    this._organizationId = organizationId;
  }

  /**
   * @param {number} userId 
   */
  withId = (userId) => {
    this._id = userId;
    this.url = Requests.createUrlTag(
      `organizations/${this._organizationId}/user/${this._id}`
    );
    
    return this;
  }
  

  /**
   * @param {OrganizationRole} newRole
   */
  setRole = async (newRole) => {
    return Requests.send({
      url: this.url`/role/${newRole}`,
      method: 'PUT',
    });
  }

  remove = async () => {
    return Requests.send({
      url: this.url``,
      method: 'DELETE',
    });
  }
}