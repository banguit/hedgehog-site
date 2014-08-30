/**
 * @fileoverview Main application class.
 * @author banguit@gmail.com (Dmitry Antonenko)
 */

goog.provide('hedgehog.core.Application');

goog.require('mvc.Router');
goog.require('goog.string');
goog.require('goog.events.EventTarget');
goog.require('hedgehog.core.Request');
goog.require('hedgehog.core.Response');
goog.require('hedgehog.core.types.ActionFilterItem');
goog.require('hedgehog.core.events.ActionEvent');
goog.require('hedgehog.core.events.ActionExceptionEvent');


/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hedgehog.core.Application = function() {
    goog.events.EventTarget.call(this);

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

    /**
     * The fragment we are mapping the controller to.
     * @type {RegExp}
     * @private
     */
    this.currentRoute_;
};
goog.inherits(hedgehog.core.Application, goog.events.EventTarget);


/**
 * @param {string} route The path The fragment we are mapping the controller to.
 * @param {Function} controller The name or object that identifying the desired controller.
 */
hedgehog.core.Application.prototype.mapRoute = function(route, controller) {
    this.router_.route(route, goog.bind(goog.partial(this.processRoute_, route, new controller()), this));
};


/**
 * @param {string} route The fragment we are mapping the controller to.
 * @param {Function} controller The name or object that identifying the desired controller.
 * @private
 */
hedgehog.core.Application.prototype.processRoute_ = function(route, controller) {
    this.currentRoute_ = new RegExp('^' + goog.string.regExpEscape(route)
                         .replace(/\\:\w+/g, '(\\w+)')
                         .replace(/\\\*/g, '(.*)')
                         .replace(/\\\[/g, '(')
                         .replace(/\\\]/g, ')?')
                         .replace(/\\\{/g, '(?:')
                         .replace(/\\\}/g, ')?') + '$');

    var i = 2
      , routeData = { 'controller' : /\w+/.exec(arguments[0])[0] }
      , pattern = /:\w*/g
      , request
      , response
      , filterContext
      , match
      , queryVals = arguments[arguments.length - 1];

    while ((match = pattern.exec(route)) != null) {
        i++;
        routeData[goog.string.removeAll(match[0], ':')] = arguments[i];
    }

    if(!goog.isDefAndNotNull(routeData.action)) {
        routeData.action = 'index';
    }

    request = new hedgehog.core.Request(routeData, window.location.href, queryVals);
    response = new hedgehog.core.Response(request);
    filterContext = new hedgehog.core.types.ActionFilterContext(request, response);

    /**
     * @constructor
     */
    var instance = Object.create(controller);

    if(goog.isFunction((instance[routeData.action]))) {

        try {
            this.dispatchEvent(new hedgehog.core.events.ActionEvent(filterContext, hedgehog.core.Application.EventType.ONACTIONEXECUTING, this));
            instance[routeData.action](request, response);
            this.dispatchEvent(new hedgehog.core.events.ActionEvent(filterContext, hedgehog.core.Application.EventType.ONACTIONEXECUTED, this));
        } catch (err) {
            this.dispatchEvent(new hedgehog.core.events.ActionExceptionEvent(filterContext, this, err));
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
    // Initialize events
    this.listen(hedgehog.core.Application.EventType.ONACTIONEXCEPTION, this.onActionException_, false, this);
    this.listen(hedgehog.core.Application.EventType.ONACTIONEXECUTING, this.onActionExecuting_, false, this);
    this.listen(hedgehog.core.Application.EventType.ONACTIONEXECUTED, this.onActionExecuted_, false, this);

    // Sort action filters
    goog.array.sort(this.actionFilters_, function(a, b) {
        return a.getOrder() - b.getOrder();
    });

    // Check current route
    this.router_.checkRoutes();
};


/**
 * @param {hedgehog.core.events.ActionEvent} e
 * @private
 */
hedgehog.core.Application.prototype.onActionExecuting_ = function(e) {
    this.forEachActionFilter_(function(filterItem) {
        filterItem.getFilter().onActionExecuting(e);
    });
};


/**
 * @param {hedgehog.core.events.ActionEvent} e
 * @private
 */
hedgehog.core.Application.prototype.onActionExecuted_ = function(e) {
    this.forEachActionFilter_(function(filterItem) {
        filterItem.getFilter().onActionExecuted(e);
    });
};


/**
 * @param {hedgehog.core.events.ActionExceptionEvent} e
 * @private
 */
hedgehog.core.Application.prototype.onActionException_ = function(e) {
    this.forEachActionFilter_(function(filterItem) {
        filterItem.getFilter().onException(e);
    });
};


/**
 * @param {Function} callback
 * @private
 */
hedgehog.core.Application.prototype.forEachActionFilter_ = function(callback) {
    var currentRoute = this.currentRoute_;
    goog.array.forEach(this.actionFilters_, function(filterItem) {
        // Check route and run
        var route = filterItem.getRoute();

        if(goog.string.isEmptySafe(route) || currentRoute.exec(route)) {
            callback.call(this, filterItem);
        }
    }, this);
};


/** @enum {string} */
hedgehog.core.Application.EventType = {
    ONACTIONEXCEPTION: goog.events.getUniqueId('ONACTIONEXCEPTION'),
    ONACTIONEXECUTING: goog.events.getUniqueId('ONACTIONEXECUTING'),
    ONACTIONEXECUTED: goog.events.getUniqueId('ONACTIONEXECUTED')
};
