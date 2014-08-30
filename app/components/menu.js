goog.provide('hedgehog.Menu');

goog.require('goog.ui.Component');
goog.require('goog.dom.classlist');
goog.require('goog.dom.dataset');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Component}
 */
hedgehog.Menu = function(opt_domHelper) {
    goog.ui.Component.call(this, opt_domHelper);

    /**
     * @type {string}
     * @private
     */
    this.currentName_ = '';
};
goog.inherits(hedgehog.Menu, goog.ui.Component);
goog.addSingletonGetter(hedgehog.Menu);


/** @inheritDoc */
hedgehog.Menu.prototype.createDom = function() {
    throw Error('Please use decorate(...) method, instead of render(...)');
};


/**
 * Set active menu item by route
 */
hedgehog.Menu.prototype.setActive = function(controllerName) {
    var parent = this.getElement()[0]
      , menuItem = document.querySelector('a[data-controller="' + controllerName + '"]')
      , name = goog.dom.dataset.get(menuItem, 'name');

    this.currentName_ = goog.isDefAndNotNull(name) ? name : '';

    goog.array.forEach(goog.dom.getElementsByTagNameAndClass('a', null, parent), function(item, index) {
        goog.dom.classlist.remove(item, hedgehog.Menu.CSS_CLASSES.ACTIVE);
    });
    goog.dom.classlist.add(menuItem, hedgehog.Menu.CSS_CLASSES.ACTIVE);
};


/**
 * @return {string} Page name that stored in the link data-name attribute
 */
hedgehog.Menu.prototype.getName = function() {
    return this.currentName_;
};


/** @enum {string} */
hedgehog.Menu.CSS_CLASSES = {
  ACTIVE: 'active'
};