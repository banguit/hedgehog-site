goog.provide('hedgehog.ResponsiveHeader');

goog.require('goog.ui.Component');
goog.require('goog.dom');

/**
 * @param {Element} wrapperElement DOM helper, used for document interaction.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Component}
 */
hedgehog.ResponsiveHeader = function(wrapperElement, opt_domHelper) {
    goog.ui.Component.call(this, opt_domHelper);

    /**
     * @type {Element}
     * @private
     */
    this.wrapper_ = wrapperElement;
};
goog.inherits(hedgehog.ResponsiveHeader, goog.ui.Component);


/** @inheritDoc */
hedgehog.ResponsiveHeader.prototype.createDom = function() {
    throw Error('Please use decorate(...) method, instead of render(...)');
};


/** @inheritDoc */
hedgehog.ResponsiveHeader.prototype.decorateInternal = function(element) {
    goog.base(this, 'decorateInternal', element);
};


/** @inheritDoc */
hedgehog.ResponsiveHeader.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var el = this.getElement()
      , navbarToggle = goog.dom.getElementByClass('navbar-toggle', el);

    // Initialize events
    goog.events.listen(navbarToggle, goog.events.EventType.CLICK, this.handleClick_, false, this);
};

/**
 * Handle click event on toggle icon
 * @param {goog.events.BrowserEvent} e The click event.
 * @private
 */
hedgehog.ResponsiveHeader.prototype.handleClick_ = function(e) {
    goog.dom.classlist.toggle(this.wrapper_, 'responsive-menu');
};
