goog.provide('hedgehog.Loader');

goog.require('goog.ui.Component');
goog.require('goog.dom');
goog.require('goog.soy');
goog.require('goog.style');
goog.require('hedgehog.templates');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Component}
 */
hedgehog.Loader = function(opt_domHelper) {
    goog.ui.Component.call(this, opt_domHelper);

};
goog.inherits(hedgehog.Loader, goog.ui.Component);

/** @inheritDoc */
hedgehog.Loader.prototype.createDom = function() {
    var opts = {
        lines: 17, // The number of lines to draw
        length: 1, // The length of each line
        width: 11, // The line thickness
        radius: 28, // The radius of the inner circle
        corners: 0.8, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#fff', // #rgb or #rrggbb or array of colors
        speed: 0.8, // Rounds per second
        trail: 23, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    }
    , overlay = goog.soy.renderAsElement(hedgehog.templates.loader)
    , spinner = new Spinner(opts).spin();

    goog.dom.appendChild(overlay, spinner.el);
    this.setElementInternal(/** @type {Element} */(overlay));
};

/** @inheritDoc */
hedgehog.Loader.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
};

/**
 * @param {boolean} visible
 */
hedgehog.Loader.prototype.show = function(visible) {
    var el = this.getElement();
    goog.style.setStyle(el, 'display', visible ? 'block' : 'none');
}