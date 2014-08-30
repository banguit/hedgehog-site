goog.provide('hedgehog.core.events.ActionExceptionEvent');

goog.require('hedgehog.core.events.ActionEvent');


/**
 * @param {hedgehog.core.types.ActionFilterContext} actionFilterContext Current filter context
 * @param {hedgehog.core.Application} app
 * @param {Error} err
 * @extends {hedgehog.core.events.ActionEvent}
 * @constructor
 */
hedgehog.core.events.ActionExceptionEvent = function(actionFilterContext, app, err) {
    hedgehog.core.events.ActionEvent.call(this, actionFilterContext, hedgehog.core.Application.EventType.ONACTIONEXCEPTION, app);

    /**
     * @type {Error}
     * @private
     */
    this.error_ = err;
};
goog.inherits(hedgehog.core.events.ActionExceptionEvent, hedgehog.core.events.ActionEvent);


/**
 * @return {Error}
 */
hedgehog.core.events.ActionExceptionEvent.prototype.getError = function() {
    return this.error_;
};