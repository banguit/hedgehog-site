goog.provide('hedgehog.core.events.ActionExceptionEvent');

goog.require('goog.events.Event');


/**
 * @param {hedgehog.core.Application} app
 * @param {Error} err
 * @extends {goog.events.Event}
 * @constructor
 */
hedgehog.core.events.ActionExceptionEvent = function(app, err) {
    goog.events.Event.call(this, hedgehog.core.Application.EventType.ONACTIONEXCEPTION, app);

    /**
     * @type {Error}
     * @private
     */
    this.error_ = err;
};
goog.inherits(hedgehog.core.events.ActionExceptionEvent, goog.events.Event);


/**
 * @return {Error}
 */
hedgehog.core.events.ActionExceptionEvent.prototype.getError = function() {
    return this.error_;
};