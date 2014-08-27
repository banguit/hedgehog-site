goog.provide('hedgehog.controllers.BlogController');

goog.require('hedgehog.core.Controller');

/**
 * @constructor
 * @extends {hedgehog.core.Controller}
 */
hedgehog.controllers.BlogController = function() {
    goog.base(this);

    this.name = "BlogController";
};
goog.inherits(hedgehog.controllers.BlogController, hedgehog.core.Controller);