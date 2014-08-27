/**
 * @fileoverview Main application class.
 * @author banguit@gmail.com (Dmitry Antonenko)
 */

goog.provide('hedgehog.core.Application');

goog.require('mvc.Router');
goog.require('goog.string');

/**
 * @constructor
 */
hedgehog.core.Application = function() {

    /**
     * @type {mvc.Router}
     * @private
     */
    this.router_ = new mvc.Router();
};


/**
 * @param {string} route The path The fragment we are mapping the controller to.
 * @param {Function} controller The name or object that identifying the desired controller.
 */
hedgehog.core.Application.prototype.mapRoute = function(route, controller) {
    if(!goog.string.contains(route, '/:action')) {
        route += '[/:action]';
    }

    this.router_.route(route, goog.partial(this.processRoute_, new controller()));
};


/**
 * @param controller
 * @param fragment
 * @param routeData
 * @private
 */
hedgehog.core.Application.prototype.processRoute_ = function(controller, fragment, routeData) {
    console.log(arguments);
};


/**
 * Define default controller for request without routes.
 * @param {Function} controller
 */
hedgehog.core.Application.prototype.defaultController = function(controller) {
    this.router_.route('{/}', goog.partial(this.processRoute_, new controller()));
};


/**
 *
 */
hedgehog.core.Application.prototype.run = function() {
    this.router_.checkRoutes();
};