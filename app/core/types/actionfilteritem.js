goog.provide('hedgehog.core.types.ActionFilterItem');

goog.require('hedgehog.core.types.ApplicationFilterItem');

/**
 * @param {!hedgehog.core.ActionFilter} filter
 * @param {string|RegExp=} route Route to watch for.
 * @param {number=} order
 * @constructor
 * @extends {hedgehog.core.types.ApplicationFilterItem}
 */
hedgehog.core.types.ActionFilterItem = function(filter, route, order) {
    goog.base(this, filter, order);


    /**
     * @type {string|RegExp}
     * @private
     */
    this.route_ = goog.isDefAndNotNull(route) ? route : '';
};
goog.inherits(hedgehog.core.types.ActionFilterItem, hedgehog.core.types.ApplicationFilterItem);


/**
 * @return {string|RegExp}
 */
hedgehog.core.types.ActionFilterItem.prototype.getRoute = function() {
    return this.route_;
};