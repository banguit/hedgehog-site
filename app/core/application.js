/**
 * @fileoverview Main application class.
 * @author banguit@gmail.com (Dmitry Antonenko)
 */

goog.provide('hedgehog.core.Application');

goog.require('mvc.Router');
goog.require('goog.string');
goog.require('goog.events');
goog.require('hedgehog.core.Request');
goog.require('hedgehog.core.Response');
goog.require('goog.debug.Error');


/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hedgehog.core.Application = function() {

    /**
     * @type {mvc.Router}
     * @private
     */
    this.router_ = new mvc.Router();

    //this.actionFilters_ = new
};
goog.inherits(hedgehog.core.Application, goog.events.EventTarget);


/**
 * @param {string} route The path The fragment we are mapping the controller to.
 * @param {Function} controller The name or object that identifying the desired controller.
 */
hedgehog.core.Application.prototype.mapRoute = function(route, controller) {
    this.router_.route(route, goog.partial(this.processRoute_, route, new controller()));
};


/**
 * @param {string} route The path The fragment we are mapping the controller to.
 * @param {Function} controller The name or object that identifying the desired controller.
 * @private
 */
hedgehog.core.Application.prototype.processRoute_ = function(route, controller) {
    var i = 2
      , token = arguments[i]
      , routeData = {
            'controller' : /\w+/.exec(arguments[0])[0]
        }
      , pattern = /:\w*/g
      , request = new hedgehog.core.Request(token)
      , response = new hedgehog.core.Response(request)
      , match;

    while ((match = pattern.exec(route)) != null) {
        i++;
        routeData[goog.string.removeAll(match[0], ':')] = arguments[i];
    }

    if(!goog.isDefAndNotNull(routeData.action)) {
        routeData.action = 'index';
    }

    /**
     * @constructor
     */
    var instance = Object.create(controller);

    if(goog.isFunction((instance[routeData.action]))) {
        instance[routeData.action](request, response);
    } else {
        throw new Error('Action "' + routeData.action + '" does not exist!');
    }
};


/**
 * @param {hedgehog.core.ActionFilter} filter
 * @param {number=} opt_order
 */
hedgehog.core.Application.prototype.addActionFilter = function(filter, opt_order) {

};


/**
 * Start application execution
 */
hedgehog.core.Application.prototype.run = function() {
    this.router_.checkRoutes();
};


/** @enum {string} */
hedgehog.core.Application.EventType = {
    START: goog.events.getUniqueId('application_start'),
    RUN: goog.events.getUniqueId('application_run')
};