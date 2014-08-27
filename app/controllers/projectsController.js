goog.provide('hedgehog.controllers.ProjectsController');

goog.require('hedgehog.core.Controller');

/**
 * @constructor
 * @extends {hedgehog.core.Controller}
 */
hedgehog.controllers.ProjectsController = function() {
    goog.base(this);

    this.name = "ProjectsController";
};
goog.inherits(hedgehog.controllers.ProjectsController, hedgehog.core.Controller);