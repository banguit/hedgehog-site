goog.provide('hedgehog.core.types.ActionFilterContext');

/**
 * @param {hedgehog.core.Request} request
 * @param {hedgehog.core.Response} response
 * @constructor
 */
hedgehog.core.types.ActionFilterContext = function(request, response) {

    /**
     * @type {hedgehog.core.Request}
     * @private
     */
    this.request_ = request;

    /**
     * @type {hedgehog.core.Response}
     * @private
     */
    this.response_ = response;
};


/**
 * @return {hedgehog.core.Request}
 */
hedgehog.core.types.ActionFilterContext.prototype.getRequest = function() {
    return this.request_;
};


/**
 * @return {hedgehog.core.Response}
 */
hedgehog.core.types.ActionFilterContext.prototype.getResponse = function() {
    return this.response_;
};