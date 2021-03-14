import axios from 'axios';

export class Cities {
  /**
   * @param {string} name 
   * @returns {Promise<City[]>}
   */
  static async find(name) {
    return axios.get('https://dev.virtualearth.net/REST/v1/Locations', {
      params: {
        key: Cities.BING_MAPS_API_KEY,
        query: name,
        maxResults: 10,
      },
    })
    .then(resp => resp
      .data
      .resourceSets[0]
      .resources
      .filter(r => r.entityType == 'PopulatedPlace')
      .filter(r => ['High', 'Medium'].includes(r.confidence))
      .map(r => ({
        name: r.address.locality,
        country: r.address.countryRegion,
        region: r.address.adminDistrict,
      }))
    );
  }
}

Cities.BING_MAPS_API_KEY = 'Atk8WqFahBgE88OPqmaBcGtaXp-eW-oaL3VjFrtRPscXG5sq1xwk69zAWanavyH_';


/**
 * @typedef {object} City
 * @property {string} name
 * @property {string} country
 * @property {string} region
 */