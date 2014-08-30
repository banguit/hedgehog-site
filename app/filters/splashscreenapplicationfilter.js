goog.provide('hedgehog.filters.SplashScreenApplicationFilter');

goog.require('hedgehog.core.ApplicationFilter');


/**
 * @constructor
 * @implements {hedgehog.core.ApplicationFilter}
 */
hedgehog.filters.SplashScreenApplicationFilter = function() {};


/** @override */
hedgehog.filters.SplashScreenApplicationFilter.prototype.onApplicationStart = function() {
    console.info('onApplicationStart');
};


/** @override */
hedgehog.filters.SplashScreenApplicationFilter.prototype.onApplicationRun = function() {
    console.info('onApplicationRun');
};
