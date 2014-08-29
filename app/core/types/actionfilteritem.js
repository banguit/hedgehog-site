goog.provide('hedgehog.core.types.ActionFilterItem');


/**
 * @param {!hedgehog.core.ActionFilter} filter
 * @param {string|RegExp=} route Route to watch for.
 * @param {number=} order
 * @constructor
 */
hedgehog.core.types.ActionFilterItem = function(filter, route, order) {

    /**
     * @type {!hedgehog.core.ActionFilter}
     * @private
     */
    this.filter_ = filter;

    /**
     * @type {string|RegExp}
     * @private
     */
    this.route_ = goog.isDefAndNotNull(route) ? route : '';

    /**
     * @type {number}
     * @private
     */
    this.order_ = goog.isDefAndNotNull(order) ? order : 0;
};


/**
 * @return {!hedgehog.core.ActionFilter}
 */
hedgehog.core.types.ActionFilterItem.prototype.getFilter = function() {
    return this.filter_;
};


/**
 * @return {string|RegExp}
 */
hedgehog.core.types.ActionFilterItem.prototype.getRoute = function() {
    return this.route_;
};


/**
 * @return {number}
 */
hedgehog.core.types.ActionFilterItem.prototype.getOrder = function() {
    return this.order_;
};