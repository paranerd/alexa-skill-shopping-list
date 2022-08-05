const axios = require('axios');

class Base {
  /**
   * Constructor.
   */
  constructor() {
    this.api_url = process.env.API_URL;
    this.headers = {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Perform GET request.
   *
   * @param {string} url
   * @param {string} path
   * @param {Object} params
   * @param {Object} headers
   * @param {boolean} withCredentials
   * @returns {Object}
   */
  async get(
    url,
    path = '',
    params = {},
    headers = {},
    withCredentials = false
  ) {
    // Format path
    path = path ? '/' + path.replace(/^\//, '') : '';

    // Perform actual request
    const res = await axios.get(url + path, {
      params: params,
      headers: headers,
      withCredentials: withCredentials,
    });

    // Return response body
    return res;
  }

  /**
   * Perform POST request.
   *
   * @param {string} url
   * @param {string} path
   * @param {Object} params
   * @param {Object} headers
   * @param {boolean} withCredentials
   * @returns {Object}
   */
  async post(
    url,
    path = '',
    params = {},
    headers = {},
    withCredentials = false
  ) {
    // Format path
    path = path ? '/' + path.replace(/^\//, '') : '';

    // Perform actual request
    const res = await axios.post(url + path, params, {
      headers: headers,
      withCredentials: withCredentials,
    });

    // Return response body
    return res.data;
  }

  /**
   * Get all items.
   * To be implemented by the subclasses.
   */
  async list() {}

  /**
   * Create item.
   * To be implemented by the subclasses.
   */
  async create() {}

  /**
   * Clear list.
   * To be implemented by the subclasses.
   */
  async clear() {}
}

module.exports = Base;
