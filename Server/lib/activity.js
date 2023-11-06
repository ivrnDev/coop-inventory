
class Validate {
  static validAction = ['created', 'updated', 'confirmed', 'deleted', 'changed', 'remove', 'restore', 'create', 'update', 'delete', 'change', 'rejected', "demoted", 'promoted'];

  static validTarget = ['transaction', 'order', 'account', 'category', 'product', 'variants']

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
      account: `${this.name} ${this.action} ${this.object}`,
      variants: `${this.name} ${this.action} ${this.object} ${this.target}`,
    }
  }

  getPhrase() {
    if (this.target in this.phrases) return this.phrases[this.target];
    return null;
  }
}



module.exports = { Validate, Phrases };


