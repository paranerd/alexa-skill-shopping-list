'use strict';

const fs = require('fs');
const path = require('path');

class ConfigHelper {
    constructor() {
        this.location = path.join(__dirname, "../", "config", "config.json");
        this.config = this.load();
    }

    /**
     * Load config from file
     */
    load() {
        let raw = fs.readFileSync(this.location);

        return JSON.parse(raw);
    }

    /**
     * Get value from config
     * 
     * @param {array|string} keys 
     * @param {any} def
     * @returns {any}
     */
    get(keys, def = null) {
        // Convert keys to array if not already
        keys = Array.isArray(keys) ? keys : [keys];

        // Set starting node
        let node = this.config;

        // Loop over all keys
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];

            // Return value for last key in keys if exists
            if (node.hasOwnProperty(key)) {
                if (i == keys.length - 1) {
                    return node[key];
                }
            }
            // If any key does not exist, leave loop
            else {
                break;
            }

            // Update current node
            node = node[key];
        }

        // Value not found, return default
        return def;
    }

    /**
     * Set config value
     * 
     * @param {array|string} keys 
     * @param {mixed} value 
     */
    set(keys, value) {
        // Convert keys to array if not already
        keys = Array.isArray(keys) ? keys : [keys];

        // Set starting node
        let node = this.config;

        // Loop over all keys
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];

            // If last key in keys and key exists
            if (node.hasOwnProperty(key)) {
                if (i == keys.length - 1) {
                    node[key] = value;
                }
            }
            else {
                node[key] = i == keys.length - 1 ? value : {};
            }

            // Update current node
            node = node[key];
        }

        // Save config
        this.save();
    }

    /**
     * Remove key from config
     * @param {array|string} keys 
     * @returns {boolean}
     */
    remove(keys) {
        // Convert keys to array if not already
        keys = Array.isArray(keys) ? keys : [keys];

        // Set starting node
        let node = this.config;

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (node.hasOwnProperty(key)) {
                if (i == keys.length - 1) {
                    delete node[key];

                    // Save updated config
                    this.save();
                }
            }
            else {
                break;
            }

            // Update current node
            node = node[key];
        }

        return false;
    }

    /**
     * Write config to file
     */
    save() {
        fs.writeFileSync(this.location, JSON.stringify(this.config, null, 4));
    }
}

module.exports = ConfigHelper;