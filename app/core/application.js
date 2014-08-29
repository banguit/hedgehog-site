/**
 * @fileoverview Main application class.
 * @author banguit@gmail.com (Dmitry Antonenko)
 */

goog.provide('hedgehog.core.Application');
goog.provide('hedgehog.core.events.ActionExceptionEvent');

goog.require('mvc.Router');
goog.require('goog.string');
goog.require('goog.events');
goog.require('hedgehog.core.Request');
goog.require('hedgehog.core.Response');
goog.require('hedgehog.core.types.ActionFilterItem');


/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hedgehog.core.Application = function() {
    goog.base(this);

    /**
     * @type {mvc.Router}
     * @private
     */
    this.router_ = new mvc.Router();

    /**
     * @type {Array.<hedgehog.core.types.ActionFilterItem>}
     * @private
     */
    this.actionFilters_ = [];
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
 * @param {string} route The fragment we are mapping the controller to.
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

        try {
            instance[routeData.action](request, response);
        } catch (err) {

            this.dispatchEvent(new hedgehog.core.events.ActionExceptionEvent(this, err));
        }

    } else {
        throw new Error('Action "' + routeData.action + '" does not exist!');
    }
};


/**
 * @param {!hedgehog.core.ActionFilter} filter
 * @param {string|RegExp=} opt_route Route to watch for.
 * @param {number=} opt_order
 */
hedgehog.core.Application.prototype.addActionFilter = function(filter, opt_route, opt_order) {
    goog.array.insert(this.actionFilters_, new hedgehog.core.types.ActionFilterItem(filter, opt_route, opt_order));
};


/**
 * Start application execution
 */
hedgehog.core.Application.prototype.run = function() {
    this.listen(hedgehog.core.Application.EventType.ONACTIONEXCEPTION,
        function(e) {
            console.log('ONACTIONEXCEPTION called!');
        }
    );


    this.router_.checkRoutes();
};


/** @enum {string} */
hedgehog.core.Application.EventType = {
    ONACTIONEXCEPTION: goog.events.getUniqueId('ONACTIONEXCEPTION'),
    ONACTIONEXECUTING: goog.events.getUniqueId('ONACTIONEXECUTING'),
    ONACTIONEXECUTED: goog.events.getUniqueId('ONACTIONEXECUTED')
};



/**
 * @param {hedgehog.core.Application} app
 * @param {Error} err
 * @extends {goog.events.Event}
 * @constructor
 */
hedgehog.core.events.ActionExceptionEvent = function(app, err) {
    hedgehog.core.events.ActionExceptionEvent.base(
        this, 'constructor', hedgehog.core.Application.EventType.ONACTIONEXCEPTION);

    /**
     * @type {Error}
     */
    this.error = err;
};
goog.inherits(hedgehog.core.events.ActionExceptionEvent, goog.events.Event);
