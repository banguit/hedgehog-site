goog.provide('hedgehog.core.events.ActionEvent');

goog.require('goog.events.Event');
goog.require('hedgehog.core.types.ActionFilterContext');


/**
 * A base class for controller actions events.
 * @param {hedgehog.core.types.ActionFilterContext} actionFilterContext Current filter context
 * @param {string|!goog.events.EventId} type Event Type.
 * @param {Object=} opt_target Reference to the object that is the target of
 *     this event. It has to implement the {@code EventTarget} interface
 *     declared at {@link http://developer.mozilla.org/en/DOM/EventTarget}.
 * @extends {goog.events.Event}
 * @constructor
 */
hedgehog.core.events.ActionEvent = function(actionFilterContext, type, opt_target) {
    goog.events.Event.call(this, type, opt_target);

    /**
     * @type {hedgehog.core.types.ActionFilterContext}
     * @private
     */
    this.actionFilterContext_ = actionFilterContext;
};
goog.inherits(hedgehog.core.events.ActionEvent, goog.events.Event);


/**
 * @return {hedgehog.core.types.ActionFilterContext}
 */
hedgehog.core.events.ActionEvent.prototype.getContext = function() {
    return this.actionFilterContext_;
};

