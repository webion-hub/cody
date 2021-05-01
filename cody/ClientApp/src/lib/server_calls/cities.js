import Requests from './requests';
import SingleXHRRequest from './single_xhr_request';

export class Cities {
  /**
   * @param {string} name 
   * @returns {Promise<City[]>}
   */
  static async find(name) {
    return Requests.single({
      url: 'https://dev.virtualearth.net/REST/v1/Locations',
      method: 'GET',
      params: {
        key: Cities.BING_MAPS_API_KEY,
        query: name,
        maxResults: 10,
        culture: 'it-IT',
      },
    })
    .then(resp => resp?.data)
    .then(Cities.formatResult);
  }

  static formatResult(bingResult) {
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

Cities.BING_MAPS_API_KEY = 'Atk8WqFahBgE88OPqmaBcGtaXp-eW-oaL3VjFrtRPscXG5sq1xwk69zAWanavyH_';


/**
 * @typedef {object} City
 * @property {string} location
 */