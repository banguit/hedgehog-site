goog.provide('hedgehog.filters.SplashScreenActionFilter');

goog.require('hedgehog.core.ActionFilter');


/**
 * @constructor
 * @implements {hedgehog.core.ActionFilter}
 */
hedgehog.filters.SplashScreenActionFilter = function() {};


/** @override */
hedgehog.filters.SplashScreenActionFilter.prototype.onActionExecuted = function() {
    console.info('onActionExecuted');
};


/** @override */
hedgehog.filters.SplashScreenActionFilter.prototype.onActionExecuting = function() {
    console.info('onActionExecuting');
};


/** @override */
hedgehog.filters.SplashScreenActionFilter.prototype.onException = function() {
    console.info('onException');
};
