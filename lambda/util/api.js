const helpers = require('./helpers');

const API_URL = process.env.API_URL;
const HEADERS = {
    'Authorization': 'Bearer ' + process.env.API_TOKEN,
    'Content-Type': 'application/json'
};

/**
 * Get last 5 items
 * 
 * @returns {Array<Object>}
 */
async function load() {
    const res = await helpers.get(API_URL, "item", {limit: 5}, HEADERS);

    return res.data;
}

/**
 * Create item
 * 
 * @param {string} name
 */
async function create(name) {
    await helpers.post(API_URL, "item", {name}, HEADERS);
}

module.exports = {
    load,
    create
}