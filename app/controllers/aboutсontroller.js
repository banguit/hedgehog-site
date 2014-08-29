goog.provide('hedgehog.controllers.AboutController');

goog.require('hedgehog.core.Controller');


/**
 * @constructor
 * @extends {hedgehog.core.Controller}
 */
hedgehog.controllers.AboutController = function() {
    goog.base(this);
};
goog.inherits(hedgehog.controllers.AboutController, hedgehog.core.Controller);


/**
 * @param {hedgehog.core.Request} request
 * @param {hedgehog.core.Response} response
 */
hedgehog.controllers.AboutController.prototype.index = function(request, response) {
    throw new Error("Hey");
    response.render(hedgehog.templates.about, {}, goog.dom.getElement('content'));
};
