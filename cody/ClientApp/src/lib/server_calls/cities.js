import Requests from './requests';

export class Cities {
  /**
   * @param {string} name 
   * @returns {Promise<City[]>}
   */
  static find = async (name) => {
    return Requests.single({
      url: 'api/cities',
      method: 'GET',
      params: {
        name: name,
      },
    })
    .then(resp => resp?.data)
    .then(Cities.formatResult);
  }

  /**
   * @private
   * @returns {City[]}
   */
  static formatResult = (bingResult) => {
    if (!bingResult)
      return [];

    return bingResult
      .resourceSets[0]
      .resources
      .filter(r => ['PopulatedPlace', 'Neighborhood'].includes(r.entityType))
      .filter(r => ['High', 'Medium'].includes(r.confidence))
      .map(r => ({
        location: r.name,
      }));
  }
}


/**
 * @typedef {object} City
 * @property {string} location
 */