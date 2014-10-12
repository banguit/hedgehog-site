goog.provide('hedgehog.core.Response');

goog.require('goog.soy');
goog.require('hedgehog.core.Router');

/**
 * Create a response based on the provided request.
 *
 * @param {hedgehog.core.Request} request
 * @param {hedgehog.core.Router} router
 * @constructor
 */
hedgehog.core.Response = function(request, router) {
    /**
     * @type {hedgehog.core.Request}
     * @private
     */
    this.request_ = request;

    /**
     * @type {hedgehog.core.Router}
     * @private
     */
    this.router_ = router;
};


/**
 * @return {hedgehog.core.Router}
 */
hedgehog.core.Response.prototype.getRouter = function() {
    return this.router_;
};


/**
 * Render the template with the provided data.
 *
 * @param {Function} template The template being rendered.
 * @param {Object=} opt_data The data being passed to the template. Usually it's {mvc.Model} object.
 * @param {Element=} opt_element The element having the template rendered in.
 * Defaults to document.body.
 */
hedgehog.core.Response.prototype.render = function(template, opt_data, opt_element) {
    var element = opt_element || document.body,
        data = opt_data || {};

    goog.soy.renderElement(element, template, data, this.request_.toJSON());
};
