import Requests from "../requests";


/**
 * @returns {Promise<ThemeColor?>}
 */
export const getThemeColor = async () => {
  return Requests.send({
    url: 'user/theme',
    method: 'GET',
  })
  .then(resp => resp.data);
}


/**
 * @param {ThemeColor} color 
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setThemeColor = async (color) => {
  return Requests.send({
    url: `user/theme/${color}`,
    method: 'PUT',
  });
}


/**
 * @typedef {'Light' | 'Dark'} ThemeColor
 */