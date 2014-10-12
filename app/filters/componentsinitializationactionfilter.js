goog.provide('hedgehog.filters.ComponentsInitializationActionFilter');

goog.require('hedgehog.core.ActionFilter');
goog.require('hedgehog.Menu');
goog.require('hedgehog.Loader');
goog.require('hedgehog.core.Application');


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

    // Initialize components
    this.loader_.render(this.wrapperElement_);
};

/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onActionExecuting = function(e) {
    this.loader_.show(true);
    this.menu_.setActive(e.getContext().getRequest().getRouteData()['controller']);

    // Set responsive header and page titles
    document.title = this.menu_.getName() + ' | ' + hedgehog.core.Application.BlogSettings.title;
    this.responsiveHeader_.setTitle(this.menu_.getName());

    // Set meta title
    var title = document.querySelector('meta[name="title"]');
    title.content = document.title;
};


/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onActionExecuted = function(e) {
    // Hide loader
    setTimeout(goog.bind(function() {
        this.loader_.show(false);
    }, this), 300);
};


/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onException = function(e) {
    console.error(e);
};
