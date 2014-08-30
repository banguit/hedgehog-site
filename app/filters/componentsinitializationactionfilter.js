goog.provide('hedgehog.filters.ComponentsInitializationActionFilter');

goog.require('hedgehog.core.ActionFilter');
goog.require('hedgehog.Menu');
goog.require('hedgehog.Loader');



/**
 * @constructor
 * @implements {hedgehog.core.ActionFilter}
 */
hedgehog.filters.ComponentsInitializationActionFilter = function() {

    /**
     * @type {Element}
     * @private
     */
    this.wrapperElement_ = goog.dom.getElementByClass('wrapper');

    /**
     * @type {hedgehog.Menu}
     * @private
     */
    this.menu_ = hedgehog.Menu.getInstance();

    /**
     * @type {hedgehog.Loader}
     * @private
     */
    this.loader_ = hedgehog.Loader.getInstance();

    /**
     * @type {hedgehog.ResponsiveHeader}
     * @private
     */
    this.responsiveHeader_ = hedgehog.ResponsiveHeader.getInstance();

    /**
     * @type {string}
     * @private
     */
    this.initialTitleText_ = document.title;

    // Initialize components
    this.loader_.render(this.wrapperElement_);
};

/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onActionExecuting = function(e) {
    this.loader_.show(true);
    this.menu_.setActive(e.getContext().getRequest().getRouteData().controller);

    // Set responsive header and page titles
    document.title = this.initialTitleText_ + ' | ' + this.menu_.getName();
    this.responsiveHeader_.setTitle(this.menu_.getName());
};


/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onActionExecuted = function(e) {
    setTimeout(goog.bind(function() {
        this.loader_.show(false);
    }, this), 1000);
};


/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onException = function(e) {
    console.log('onException');
    console.error(e);
};
