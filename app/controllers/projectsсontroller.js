goog.provide('hedgehog.controllers.ProjectsController');

goog.require('hedgehog.core.Controller');

/**
 * @constructor
 * @extends {hedgehog.core.Controller}
 */
hedgehog.controllers.ProjectsController = function() {
    goog.base(this);
};
goog.inherits(hedgehog.controllers.ProjectsController, hedgehog.core.Controller);


/**
 * @param {hedgehog.core.Request} request
 * @param {hedgehog.core.Response} response
 */
hedgehog.controllers.ProjectsController.prototype.index = function(request, response) {
    response.render(hedgehog.templates.projects, {}, goog.dom.getElement('content'));
};