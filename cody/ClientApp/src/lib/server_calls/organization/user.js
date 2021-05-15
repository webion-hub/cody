import ChangesListener from "../changes_listener";
import Organization from "../organization";
import Requests from "../requests";


export default class User {
  /**
   * @param {Organization} organization 
   */
  static of(organization) {
    return new User(organization);
  }

  /**
   * @param {Organization} organization 
   */
  constructor(organization) {
    this._organization = organization;
  }

  /**
   * @param {number} userId 
   */
  withId = (userId) => {
    this._id = userId;
    this.url = Requests.createUrlTag(
      this._organization.url`/user/${this._id}`
    );
    
    return this;
  }
  

  /**
   * @returns {Promise<OrganizationRole>} 
   */
  getRole = async () => {
    return Requests.get({
      url: this.url`/role`,
    });
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

  /**
   * @param {'userAccount' | 'userAccountDetail'} entity
   */
  listenFor = (entity) => {
    return new ChangesListener(`${entity}/${this._id}`);
  }
}