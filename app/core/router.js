goog.provide('hedgehog.core.Router');

goog.require('mvc.Router');


/**
 * @constructor
 * @extends {mvc.Router}
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
    mvc.Router.call(this, opt_noFragment, opt_blankPage, opt_input, opt_iframe);
};
goog.inherits(hedgehog.core.Router, mvc.Router);


/** @override */
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
