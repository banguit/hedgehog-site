goog.provide('hedgehog.core.Router');

goog.require('goog.History');
goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.history.Html5History');


/**
 * @constructor
 * @extends {goog.events.EventTarget}
 *
 * @param {boolean=} opt_noFragment set to true to hide fragment when using
 * HTML5 history.
 * @param {string=} opt_blankPage url to a blank page - needed if HTML5 is not
 * available and you don't want to show the fragment.
 * @param {HTMLInputElement=} opt_input The hidden input element to be used to
 * store the history token.  If not provided, a hidden input element will
 * be created using document.write.
 * @param {HTMLIFrameElement=} opt_iframe The hidden iframe that will be used by
 * IE for pushing history state changes, or by all browsers if opt_noFragment
 * is true. If not provided, a hidden iframe element will be created using
 * document.write.
 */
hedgehog.core.Router = function(opt_noFragment, opt_blankPage, opt_input, opt_iframe) {
    goog.base(this);
    this.history_ = goog.history.Html5History.isSupported() ?
        new goog.history.Html5History() :
        new goog.History(!!(opt_blankPage && opt_noFragment), opt_blankPage,
            opt_input, opt_iframe);
    if (this.history_.setUseFragment)
        this.history_.setUseFragment(!opt_noFragment);
    goog.events.listen(this.history_, goog.history.EventType.NAVIGATE,
        this.onChange_, false, this);
    this.routes_ = [];
    this.currentFragment_ = "";
    this.history_.setEnabled(true);
};
goog.inherits(hedgehog.core.Router, goog.events.EventTarget);


/**
 * router event types
 */
hedgehog.core.Router.EventType = {
    /*
     * event to trigger when route is about to change.
     */
    ROUTE_EXPIRED: "routeExpired"
};


/**
 * pass through the fragment for the URL
 *
 * @param {string} fragment to set for the history token.
 */
hedgehog.core.Router.prototype.navigate = function(fragment) {
    this.history_.setToken(fragment);
};


/**
 * returns current routed fragment
 * @return {string} routed fragment.
 */
hedgehog.core.Router.prototype.getFragment = function() {
    return this.currentFragment_;
};


/**
 * define route as string or regex. /:abc/ will pass "abc" through as an
 * argument. *abc/def will pass through all after the * as an argument
 *
 * @param {string|RegExp} route to watch for.
 * @param {function(string, ...[string])} fn should take in the token and any captured strings.
 * @param {Object=} opt_context Object in whose context the function is to be
 *     called (the global scope if none).
 */
hedgehog.core.Router.prototype.route = function(route, fn, opt_context) {
    if (goog.isString(route))
        route = new RegExp('^' + goog.string.regExpEscape(route)
            .replace(/\\:\w+/g, '([a-zA-Z0-9._-]+)')
            .replace(/\\\*/g, '(.*)')
            .replace(/\\\[/g, '(')
            .replace(/\\\]/g, ')?')
            .replace(/\\\{/g, '(?:')
            .replace(/\\\}/g, ')?') + '$');
    var completeRoute = {
        route: route,
        callback: fn,
        context: opt_context
    };

    this.routes_.push(completeRoute);
};

/**
 * run route callback if route regexp matches fragment
 * @param {Object} route Route object with context and route regexp.
 * @param {string} fragment URI fragment to match with.
 */
hedgehog.core.Router.prototype.runRouteIfMatches_ = function(route, fragment) {
    var args = route.route.exec(fragment);
    if (args) {
        route.callback.apply(route.context, args);
        return true;
    }
    return false;
};


/**
 * @private
 */
hedgehog.core.Router.prototype.onChange_ = function() {
    var fragment = this.history_.getToken();
    var locationPathname = window.location.pathname;

    if(goog.string.isEmptyOrWhitespace(fragment) && locationPathname.length > 1) {
        fragment = locationPathname;
    }

    if (fragment != this.currentFragment_) {
        this.dispatchEvent({
            type: hedgehog.core.Router.EventType.ROUTE_EXPIRED,
            previous: this.currentFragment_,
            current: fragment
        });
        this.currentFragment_ = fragment;
        goog.array.find(this.routes_ || [], function(route) {
            return this.runRouteIfMatches_(route, fragment);
        }, this);
    }
};


hedgehog.core.Router.prototype.checkRoutes = function() {
    var fragment = this.history_.getToken();
    var locationPathname = window.location.pathname;

    if(goog.string.isEmptyOrWhitespace(fragment) && locationPathname.length > 1) {
        fragment = locationPathname;
    }

    this.currentFragment_ = fragment;
    goog.array.find(this.routes_ || [], function(route) {
        return this.runRouteIfMatches_(route, fragment);
    }, this);
};
