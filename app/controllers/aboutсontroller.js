goog.provide('hedgehog.controllers.AboutController');

goog.require('hedgehog.core.Controller');
goog.require('hedgehog.templates');


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
 * @param {Function} resolve
 * @param {Function} reject
 */
hedgehog.controllers.AboutController.prototype.index = function(request, response, resolve, reject) {
    // Set meta description
    var description = document.querySelector('meta[name="description"]');
    description.content = 'About Dmitry Antonenko and contacts.';

    response.render(hedgehog.templates.about, {}, goog.dom.getElement('content'));
    resolve();
};
