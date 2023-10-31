
class Validate {
  static validAction = ['created', 'updated', 'confirmed', 'deleted', 'changed', 'remove', 'restore', 'create', 'update', 'delete', 'change'];

  static validTarget = ['transactions', 'orders', 'accounts', 'category', 'product',]

  action(action) {
    return Validate.validAction.includes(action);
  }
  target(target) {
    return Validate.validTarget.includes(target);
  }
}

class Phrases {
  constructor(name, action, target, object) {
    this.name = name;
    this.action = action;
    this.object = object;
    this.target = target;
    this.phrases = {
      category: `${this.name} ${this.action} ${this.object} ${this.target} `,
      product: `${this.name} ${this.action} ${this.object} ${this.target}`,
    }
  }

  getPhrase() {
    if (this.target in this.phrases) return this.phrases[this.target];
    return null;
  }

}



module.exports = { Validate, Phrases };


