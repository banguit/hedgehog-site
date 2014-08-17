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
    goog.events.listen(this.wrapper_, goog.events.EventType.CLICK, this.handleWrapperClick_, true, this);
    goog.events.listen(navbarToggle, goog.events.EventType.CLICK, this.handleClick_, false, this);
};

/**
 * Set title
 * @param {string} pagetitle
 */
hedgehog.ResponsiveHeader.prototype.setTitle = function(pagetitle) {
    //navbar-text
    var title = goog.dom.getElementByClass('navbar-text', this.getElement());
    goog.dom.setTextContent(title, pagetitle);
};


/**
 * Handle click event on toggle icon
 * @param {goog.events.BrowserEvent} e The click event.
 * @private
 */
hedgehog.ResponsiveHeader.prototype.handleClick_ = function(e) {
    goog.dom.classlist.toggle(this.wrapper_, hedgehog.ResponsiveHeader.CSS_CLASS);
};


/**
 * Handle click on wrapper
 * @private
 */
hedgehog.ResponsiveHeader.prototype.handleWrapperClick_ = function(e) {
    var googDomClassList = goog.dom.classlist;
    if(e.target == this.wrapper_ && googDomClassList.contains(this.wrapper_, hedgehog.ResponsiveHeader.CSS_CLASS)) {
        googDomClassList.toggle(this.wrapper_, hedgehog.ResponsiveHeader.CSS_CLASS);
    }
};


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 *
 * @type {string}
 */
hedgehog.ResponsiveHeader.CSS_CLASS = 'responsive-menu';