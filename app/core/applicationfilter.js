goog.provide('hedgehog.core.ApplicationFilter');


/**
 * Application filter.
 * @interface
 */
hedgehog.core.ApplicationFilter = function() {};

/**
 * Called when an application start initialization.
 * @param {goog.events.Event} e
 */
hedgehog.core.ApplicationFilter.prototype.onApplicationStart = goog.nullFunction;


/**
 * Called when an application end initialization.
 * @param {goog.events.Event} e
 */
hedgehog.core.ApplicationFilter.prototype.onApplicationRun = goog.nullFunction;


/**
 * Called when an application launched.
 * @param {goog.events.Event} e
 */
hedgehog.core.ApplicationFilter.prototype.onApplicationLoaded = goog.nullFunction;