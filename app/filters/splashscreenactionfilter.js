goog.provide('hedgehog.filters.SplashScreenActionFilter');

goog.require('hedgehog.core.ActionFilter');


/**
 * @constructor
 * @extends {hedgehog.core.ActionFilter}
 */
hedgehog.filters.SplashScreenActionFilter = function() {
    goog.base(this);
};
goog.inherits(hedgehog.filters.SplashScreenActionFilter, hedgehog.core.ActionFilter);


/** @inheritDoc */
hedgehog.filters.SplashScreenActionFilter.prototype.onActionExecuted = function() {
    console.info('onActionExecuted');
};


/** @inheritDoc */
hedgehog.filters.SplashScreenActionFilter.prototype.onActionExecuting = function() {
    console.info('onActionExecuting');
};


/** @inheritDoc */
hedgehog.filters.SplashScreenActionFilter.prototype.onException = function() {
    console.info('onException');
};
