goog.provide('hedgehog.filters.ComponentsInitializationActionFilter');

goog.require('hedgehog.core.ActionFilter');


/**
 * @constructor
 * @implements {hedgehog.core.ActionFilter}
 */
hedgehog.filters.ComponentsInitializationActionFilter = function() {};


/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onActionExecuted = function() {
    console.info('onActionExecuted');
};


/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onActionExecuting = function() {
    console.info('onActionExecuting');
};


/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onException = function(e) {
    console.info('onException');
    console.info(e);
};
