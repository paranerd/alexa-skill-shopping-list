const Base = require('./base');

class ToDoList extends Base {
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
    const res = await this.get(this.api_url, 'item', null, this.headers);

    return res.data;
  }

  /**
   * Create item.
   *
   * @param {string} name
   */
  async create(name) {
    await this.post(this.api_url, 'item', { name }, this.headers);
  }

  /**
   * Clear list.
   */
  async clear() {
    await this.post(this.api_url, 'item/clearDone', null, this.headers);
  }
}

module.exports = ToDoList;
