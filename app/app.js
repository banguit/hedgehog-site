/**
 * @fileOverview Main class for application, that used as original entry point
 */

goog.provide('hedgehog.Application');

goog.require('goog.dom');


/**
 * The base class for application.
 * @param {goog.dom.DomHelper=} opt_domHelper The dom helper to use for finding the window objects.
 * @constructor
 */
hedgehog.Application = function(opt_domHelper) {

    /**
     * The dom helper to use for finding the window objects to reference.
     * @type {goog.dom.DomHelper}
     * @private
     */
    this.domHelper_ = opt_domHelper || goog.dom.getDomHelper();
};


hedgehog.Application.prototype.run = function() {
    var dh = this.domHelper_
      , el = dh.createDom('h1')
      , body = dh.getDocument().body;

    el.appendChild(dh.createTextNode('Hello World!'));
    body.appendChild(el);
};
