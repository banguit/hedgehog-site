goog.provide('hedgehog.Header');

goog.require('goog.ui.Component');
goog.require('goog.dom');

/**
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Component}
 */
hedgehog.Header = function(opt_domHelper) {
    goog.ui.Component.call(this, opt_domHelper);

};
goog.inherits(hedgehog.Header, goog.ui.Component);


/** @inheritDoc */
hedgehog.Header.prototype.createDom = function() {
    throw Error('Please use decorate(...) method, instead of render(...)');
};


/** @inheritDoc */
hedgehog.Header.prototype.decorateInternal = function(element) {
    goog.base(this, 'decorateInternal', element);
};


/** @inheritDoc */
hedgehog.Header.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

};
