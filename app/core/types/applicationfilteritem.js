goog.provide('hedgehog.core.types.ApplicationFilterItem');


/**
 * @param {!hedgehog.core.ApplicationFilter|T} filter
 * @param {number=} order
 * @constructor
 * @template T
 */
hedgehog.core.types.ApplicationFilterItem = function(filter, order) {

    /**
     * @type {!hedgehog.core.ApplicationFilter|T}
     * @private
     */
    this.filter_ = filter;

    /**
     * @type {number}
     * @private
     */
    this.order_ = goog.isDefAndNotNull(order) ? order : 0;
};


/**
 * @return {!hedgehog.core.ApplicationFilter|T}
 */
hedgehog.core.types.ApplicationFilterItem.prototype.getFilter = function() {
    return this.filter_;
};


/**
 * @return {number}
 */
hedgehog.core.types.ApplicationFilterItem.prototype.getOrder = function() {
    return this.order_;
};