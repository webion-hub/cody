import '../cody_types';
import Requests from "../requests";


export default class User {
  static withId = (id) => {
    return new this(id);
  }

  constructor(id) {
    this._id = id;
  }


  /**
   * @param {UserAccountRole} role 
   */
  setRole = async (role) => {
    return Requests.send({
      url: `admin/users/${this._id}/role/${role}`,
      method: 'PUT',
    });
  }

  /**
   * @returns {Promise<UserAccountRole>} 
   */
  getRole = async () => {
    return Requests.send({
      url: `admin/users/${this._id}/role`,
      method: 'GET',
    })
    .then(resp => resp.data);
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
  delete = async () => {
    return Requests.send({
      url: `admin/users/${this._id}`,
      method: 'DELETE',
    });
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
  deleteForever = async () => {
    return Requests.send({
      url: `admin/users/delete_forever/${this._id}`,
      method: 'DELETE',
    }); 
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
  restore = async () => {
    return Requests.send({
      url: `admin/users/restore/${this._id}`,
      method: 'PATCH',
    });
  }
};