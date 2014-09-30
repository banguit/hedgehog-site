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
goog.require('goog.Promise');


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
     * @type {Array.<hedgehog.core.types.ApplicationFilterItem>}
     * @private
     */
    this.applicationFilters_ = [];

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
    this.setCurrentRoute_(route); // TODO: Move to ROUTE_EXPIRED

    var controllerName = /[a-zA-Z0-9._-]+/.exec(route);

    if(controllerName == null) {
        window.location.replace('/notfound');
    }

    var i = 2
      , routeData = { 'controller' : controllerName[0] }
      , pattern = /:[a-zA-Z0-9._-]*/g
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
            new goog.Promise(function(resolve, reject) {
                this.dispatchEvent(new hedgehog.core.events.ActionEvent(filterContext, hedgehog.core.Application.EventType.ACTIONEXECUTING, resolve, this));
            }, this)
            .then(function() {
                return new goog.Promise(function(resolve, reject) {
                    instance[routeData.action](request, response, resolve, reject);
                });
            }, undefined, this)
            .then(function() {
                return new goog.Promise(function(resolve, reject) {
                    this.dispatchEvent(new hedgehog.core.events.ActionEvent(filterContext, hedgehog.core.Application.EventType.ACTIONEXECUTED, resolve, this));
                }, this);
            }, undefined, this)
            .then(function() {
                return new goog.Promise(function(resolve, reject) {
                    // Application loaded
                    this.dispatchEvent(hedgehog.core.Application.EventType.APPLICATIONLOADED);
                    resolve();
                }, this);
            }, undefined, this);

        } catch (err) {
            this.dispatchEvent(new hedgehog.core.events.ActionExceptionEvent(filterContext, this, err));
        }

    } else {
        throw new Error('Action "' + routeData.action + '" does not exist!');
    }
};


/**
 * Register application filter
 * @param {!hedgehog.core.ApplicationFilter} filter
 * @param {number=} opt_order
 */
hedgehog.core.Application.prototype.addApplicationFilter = function(filter, opt_order) {
    goog.array.insert(this.applicationFilters_, new hedgehog.core.types.ApplicationFilterItem(filter, opt_order));
};


/**
 * Register action filter
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
    // Add additional system routes
    this.mapRoute('*', goog.nullFunction); // To handle all unhandled routes / 404

    // Initialize events
    this.listenOnce(hedgehog.core.Application.EventType.APPLICATIONSTART, this.onApplicationStart_, false, this);
    this.listenOnce(hedgehog.core.Application.EventType.APPLICATIONRUN, this.onApplicationRun_, false, this);
    this.listenOnce(hedgehog.core.Application.EventType.APPLICATIONLOADED, this.onApplicationLoaded_, false, this);
    this.listen(hedgehog.core.Application.EventType.ACTIONEXCEPTION, this.onActionException_, false, this);
    this.listen(hedgehog.core.Application.EventType.ACTIONEXECUTING, this.onActionExecuting_, false, this);
    this.listen(hedgehog.core.Application.EventType.ACTIONEXECUTED, this.onActionExecuted_, false, this);

    // Sort application filters
    goog.array.sort(this.applicationFilters_, function(a, b) {
        return a.getOrder() - b.getOrder();
    });

    // Application start
    this.dispatchEvent(hedgehog.core.Application.EventType.APPLICATIONSTART);

    // Sort action filters
    goog.array.sort(this.actionFilters_, function(a, b) {
        return a.getOrder() - b.getOrder();
    });

    // Check current route
    this.router_.checkRoutes();

    // Application run
    this.dispatchEvent(hedgehog.core.Application.EventType.APPLICATIONRUN);
};


/**
 * Called before the action method is invoked.
 * @param {hedgehog.core.events.ActionEvent} e
 * @private
 */
hedgehog.core.Application.prototype.onActionExecuting_ = function(e) {
    this.forEachActionFilter_(function(filterItem) {
        filterItem.getFilter().onActionExecuting(e);
    });
    e.resolvePromise();
};


/**
 * Called after the action method is invoked.
 * @param {hedgehog.core.events.ActionEvent} e
 * @private
 */
hedgehog.core.Application.prototype.onActionExecuted_ = function(e) {
    this.forEachActionFilter_(function(filterItem) {
        filterItem.getFilter().onActionExecuted(e);
    });
    e.resolvePromise();
};


/**
 * Called when an unhandled exception occurs in the action.
 * @param {hedgehog.core.events.ActionExceptionEvent} e
 * @private
 */
hedgehog.core.Application.prototype.onActionException_ = function(e) {
    this.forEachActionFilter_(function(filterItem) {
        filterItem.getFilter().onException(e);
    });
    e.resolvePromise();
};


/**
 * Called when an application start initialization.
 * @param {goog.events.Event} e
 * @private
 */
hedgehog.core.Application.prototype.onApplicationStart_ = function(e) {
    this.forEachApplicationFilter_(function(filterItem){
        filterItem.getFilter().onApplicationStart(e);
    });
};


/**
 * Called when an application end initialization.
 * @param {goog.events.Event} e
 * @private
 */
hedgehog.core.Application.prototype.onApplicationRun_ = function(e) {
    this.forEachApplicationFilter_(function(filterItem){
        filterItem.getFilter().onApplicationRun(e);
    });
};

/**
 * Called when an application launched.
 * @param {goog.events.Event} e
 * @private
 */
hedgehog.core.Application.prototype.onApplicationLoaded_ = function(e) {
    this.forEachApplicationFilter_(function(filterItem){
        filterItem.getFilter().onApplicationLoaded(e);
    });
};


/**
 * Calls a function for each registered application filter.
 * @param {Function} callback
 * @private
 */
hedgehog.core.Application.prototype.forEachApplicationFilter_ = function(callback) {
    goog.array.forEach(this.applicationFilters_, function(filterItem) {
        callback.call(this, filterItem);
    }, this);
};


/**
 * Calls a function for each registered action filter, but skip filters with route that not match current route.
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


/**
 * @param {string} route
 */
hedgehog.core.Application.prototype.setCurrentRoute_ = function(route) {
    this.currentRoute_ = new RegExp('^' + goog.string.regExpEscape(route)
                        .replace(/\\:\w+/g, '([a-zA-Z0-9._-]+)')
                        .replace(/\\\*/g, '(.*)')
                        .replace(/\\\[/g, '(')
                        .replace(/\\\]/g, ')?')
                        .replace(/\\\{/g, '(?:')
                        .replace(/\\\}/g, ')?') + '$');
};


/** @enum {string} */
hedgehog.core.Application.EventType = {
    APPLICATIONSTART: goog.events.getUniqueId('application_start'),
    APPLICATIONRUN: goog.events.getUniqueId('application_start'),
    APPLICATIONLOADED: goog.events.getUniqueId('application_loaded'),
    ACTIONEXCEPTION: goog.events.getUniqueId('action_exception'),
    ACTIONEXECUTING: goog.events.getUniqueId('action_executing'),
    ACTIONEXECUTED: goog.events.getUniqueId('action_executed')
};
