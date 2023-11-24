
class Validate {
  static validAction = ['created', 'updated', 'confirmed', 'deleted', 'added', 'changed', 'remove', 'restore', 'create', 'update', 'delete', 'change', 'rejected', 'cancelled', 'set', "demoted", 'promoted'];

  static validTarget = ['transaction', 'order', 'account', 'category', 'product', 'variants', 'banners', 'login']

  action(action) {
    return Validate.validAction.includes(action);
  }
  target(target) {
    return Validate.validTarget.includes(target);
  }
}

class Phrases {
  constructor(name, action, target, object, change) {
    this.name = name;
    this.action = action;
    this.object = object;
    this.target = target;
    this.change = change;
    this.phrases = {
      category: this.change ?
        `${this.name} ${this.action} ${this.object} to ${this.change} in ${this.target} ` :
        `${this.name} ${this.action} ${this.object} ${this.target} `,
      product: `${this.name} ${this.action} ${this.object} ${this.target}`,
      transaction: `${this.name} ${this.action} ${this.target} No.${this.object}`,
      account: this.change ?
        `${this.name} ${this.action} ${this.object} in ${this.target} as ${change}` :
        `${this.name} ${this.action} ${this.target} ID #${this.object}`,
      variants: `${this.name} ${this.action} ${this.object} ${this.target}`,
      banners: `${this.name} ${this.action} new ${this.target}`,
      login: `${this.name} ${this.action} ${this.target} details`
    }
  }

  getPhrase() {
    if (this.target in this.phrases) return this.phrases[this.target];
    return null;
  }
}



module.exports = { Validate, Phrases };


