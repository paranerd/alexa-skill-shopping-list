const axios = require('axios');

/**
 * Perform GET request
 * 
 * @param {string} url
 * @param {string} path
 * @param {Object} params
 * @param {Object} headers
 * @param {boolean} withCredentials
 * @returns {Object}
 */
async function get(url, path = "", params = {}, headers = {}, withCredentials = false) {
    // Format path
    path = path ? "/" + path.replace(/^\//, "") : "";

    // Perform actual request
    const res = await axios.get(url + path, {params: params, headers: headers, withCredentials: withCredentials});

    // Return response body
    return res;
}

/**
 * Perform POST request
 * 
 * @param {string} url
 * @param {string} path
 * @param {Object} params
 * @param {Object} headers
 * @param {boolean} withCredentials
 * @returns {Object}
 */
async function post(url, path = "", params = {}, headers = {}, withCredentials = false) {
    // Format path
    path = path ? "/" + path.replace(/^\//, "") : "";

    // Perform actual request
    const res = await axios.post(url + path, params, {headers: headers, withCredentials: withCredentials});

    // Return response body
    return res.data;
}

module.exports = {
    post,
    get
}