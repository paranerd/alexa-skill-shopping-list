const Base = require('./base');

class HomeAssistant extends Base {
  /**
   * Constructor.
   */
  constructor() {
    super();
  }

  /**
   * Get items.
   *
   * @returns {Array<Object>}
   */
  async list() {
    const res = await this.get(
      this.api_url,
      'shopping_list',
      null,
      this.headers
    );

    return res.data.reverse();
  }

  /**
   * Create item.
   *
   * @param {string} name
   */
  async create(name) {
    await this.post(this.api_url, 'shopping_list/item', { name }, this.headers);
  }

  /**
   * Clear list.
   */
  async clear() {
    await this.post(
      this.api_url,
      'shopping_list/clear_completed',
      null,
      this.headers
    );
  }
}

module.exports = HomeAssistant;
