goog.provide('hedgehog.Menu');

goog.require('goog.ui.Component');

/**
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Component}
 */
hedgehog.Menu = function(opt_domHelper) {
    goog.ui.Component.call(this, opt_domHelper);
};
goog.inherits(hedgehog.Menu, goog.ui.Component);


/** @inheritDoc */
hedgehog.Menu.prototype.createDom = function() {
    throw Error('Please use decorate(...) method, instead of render(...)');
};


/**
 *
 */
hedgehog.Menu.prototype.setActive = function(urlPattern) {
    var parent = this.getElement()[0]
      , menuItem = document.querySelector('a[href="' + urlPattern + '"]');

    goog.array.forEach(goog.dom.getElementsByTagNameAndClass('a', null, parent), function(item, index) {
        goog.dom.classes.remove(item, hedgehog.Menu.CSS_CLASSES.ACTIVE);
    });
    goog.dom.classes.add(menuItem, hedgehog.Menu.CSS_CLASSES.ACTIVE);
};


/** @enum {string} */
hedgehog.Menu.CSS_CLASSES = {
  ACTIVE: 'active'
};