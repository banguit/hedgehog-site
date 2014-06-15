goog.provide('hedgehog.Header');

goog.required('goog.ui.component');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Component}
 */
hedgehog.Header = function(opt_domHelper) {
    goog.ui.Component.call(this, opt_domHelper);

};
goog.inherits(hedgehog.Header, goog.ui.Component);
