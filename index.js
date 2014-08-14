
/**
 * Dependencies
 */

var dom = require('dom');
var events = require('events');
var Emitter = require('emitter');
var classes = require('classes');
var reactive = require('reactive');


/**
 * Expose View
 */

module.exports = View;


/**
 * Instantiates a new View
 *
 * @returns {Self}
 * @api public
 */

function View(el){
  Emitter.call(this);
  this.$el = dom(el);
  this.el = this.$el[0];
  this.events = events(this.el, this);
  this.classes = classes(this.el);
  this._bound = {};
}

/**
 * Mixin Emitter
 */

View.prototype.__proto__ = Emitter.prototype;


/**
 * Unbinds Event emitters and removes
 * any dom events also
 *
 * @returns {Self}
 * @api public
 */

View.prototype.unbind = function(){
  this.emit('unbind');
  this.off();
  this.events.unbind();
}


/**
 * find `selector` in `this.$el`
 *
 * @returns {Self}
 * @api public
 */

View.prototype.find = function(selector){
  return this.$el.find(selector);
}


/**
 * Enable react
 *
 * @returns {Self}
 * @api public
 */

View.prototype.react = function(doc, opts){
  this._react = reactive(this.el, doc, opts);
}


/**
 * Bind `method` helper
 *
 * @returns {Self}
 * @api public
 */

View.prototype.bound = function(method) {
  if (!this._bound[method]) {
    this._bound[method] = this[method].bind(this)
  }
  return this._bound[method]
}