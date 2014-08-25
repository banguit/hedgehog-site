/**
 * @fileoverview An abstraction of a controller.
 *
 * @author banguit@gmail.com (Dmitry Antonenko)
 */
goog.provide('hedgehog.core.BaseController');

goog.require('mvc.Router');

/**
 * Defines an abstract controller for handling requests to certain fragments.
 * @param {mvc.Router}
 * @constructor
 */
hedgehog.core.BaseController = function(router) {

    /**
     * @type {mvc.Router}
     * @private
     */
    this.router_ = router;
};


/**
 * Define route as string or regex.
 * @type {Function|abstractMethod}
 * @return {string|RegExp} route to watch for.
 */
hedgehog.core.BaseController.prototype.route = goog.abstractMethod;