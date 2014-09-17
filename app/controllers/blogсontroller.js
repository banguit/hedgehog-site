goog.provide('hedgehog.controllers.BlogController');

goog.require('hedgehog.core.Controller');
goog.require('hedgehog.ghost');

/**
 * @constructor
 * @extends {hedgehog.core.Controller}
 */
hedgehog.controllers.BlogController = function() {
    goog.base(this);
};
goog.inherits(hedgehog.controllers.BlogController, hedgehog.core.Controller);

/**
 * @param {hedgehog.core.Request} request
 * @param {hedgehog.core.Response} response
 */
hedgehog.controllers.BlogController.prototype.index = function(request, response) {

    hedgehog.ghost.loadPosts(function(data) {
        console.dir(data);
        response.render(hedgehog.templates.blog, {}, goog.dom.getElement('content'));
    });
};