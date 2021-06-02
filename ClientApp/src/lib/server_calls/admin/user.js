import '../cody_types';
import Requests from "../requests";


export default class User {
  static withId = (id) => {
    return new this(id);
  }

  constructor(id) {
    this._id = id;
    this.url = Requests.createUrlTag(
      `admin/user/${this._id}`
    );
  }


  /**
   * @param {UserAccountRole} role 
   */
  setRole = async (role) => {
    return Requests.send({
      url: this.url`/role/${role}`,
      method: 'PUT',
    });
  }

  /**
   * @returns {Promise<UserAccountRole>} 
   */
  getRole = async () => {
    return Requests.send({
      url: this.url`/role`,
      method: 'GET',
    })
    .then(resp => resp.data);
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
  delete = async () => {
    return Requests.send({
      url: this.url``,
      method: 'DELETE',
    });
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
  deleteForever = async () => {
    return Requests.send({
      url: this.url`/delete_forever`,
      method: 'DELETE',
    }); 
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
  restore = async () => {
    return Requests.send({
      url: this.url`/restore`,
      method: 'PATCH',
    });
  }
};