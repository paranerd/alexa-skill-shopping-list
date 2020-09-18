const axios = require('axios');

/**
 * Perform GET request
 * 
 * @param {string} url
 * @param {string} path
 * @param {Object} params
 * @param {Object} headers
 * @param {boolean} withCredentials
 */
let post = async function(url, path = "", params = {}, headers = {}, withCredentials = false) {
	path = path ? path.replace(/^\//, "") : "";

	const res = await axios.post(url + "/" + path, params, {headers: headers, withCredentials: withCredentials});
    return res;
}

/**
 * Perform GET request
 * 
 * @param {string} url
 * @param {string} path
 * @param {Object} params
 * @param {Object} headers
 * @param {boolean} withCredentials
 */
let get = async function(url, path = "", params = {}, headers = {}, withCredentials = false) {
	path = path ? path.replace(/^\//, "") : "";

	const res = await axios.get(url + "/" + path, params, {headers: headers, withCredentials: withCredentials});
    return res;
}

module.exports = {
    post,
    get
}