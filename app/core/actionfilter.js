goog.provide('hedgehog.core.ActionFilter');


/**
 * Action filter.
 * @interface
 */
hedgehog.core.ActionFilter = function() {};


/**
 * Called when an unhandled exception occurs in the action.
 * @param {hedgehog.core.events.ActionExceptionEvent} e
 */
hedgehog.core.ActionFilter.prototype.onException = goog.nullFunction;


/**
 * Called before the action method is invoked.
 * @param {hedgehog.core.events.ActionEvent} e
 */
hedgehog.core.ActionFilter.prototype.onActionExecuting = goog.nullFunction;


/**
 * Called after the action method is invoked.
 * @param {hedgehog.core.events.ActionEvent} e
 */
hedgehog.core.ActionFilter.prototype.onActionExecuted = goog.nullFunction;