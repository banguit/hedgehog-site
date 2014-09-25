goog.provide('hedgehog.filters.ComponentsInitializationApplicationFilter');

goog.require('hedgehog.core.ApplicationFilter');
goog.require('hedgehog.SplashScreen');
goog.require('hedgehog.Header');
goog.require('hedgehog.Menu');
goog.require('hedgehog.ResponsiveHeader');


/**
 * @constructor
 * @implements {hedgehog.core.ApplicationFilter}
 */
hedgehog.filters.ComponentsInitializationApplicationFilter = function() {

    /**
     * @type {Element}
     * @private
     */
    this.wrapperElement_ = goog.dom.getElementByClass('wrapper');

    /**
     * @type {Element}
     * @private
     */
    this.contentElement_ = goog.dom.getElement('content');

    /**
     * @type {hedgehog.SplashScreen}
     * @private
     */
    this.splashScreen_ = new hedgehog.SplashScreen(this.wrapperElement_ );

    /**
     * @type {hedgehog.Header}
     * @private
     */
    this.header_ = new hedgehog.Header();

    /**
     * @type {hedgehog.Menu}
     * @private
     */
    this.menu_ = hedgehog.Menu.getInstance();

    /**
     * @type {hedgehog.ResponsiveHeader}
     * @private
     */
    this.responsiveHeader_ = hedgehog.ResponsiveHeader.getInstance();

    /**
     * @type {boolean}
     * @private
     */
    this.applicationLoaded_ = false;
};


/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.onApplicationStart = function() {

    // Initialize splash screen
    new goog.Promise(function(resolve, reject) {
        this.splashScreen_.render();
        var resolverFn = goog.bind(function() {
            if(this.splashScreen_.isInDocument()) {
                resolve();
            } else {
                resolverFn();
            }
        }, this);
        window.setTimeout(resolverFn, 100);
    }, this).then(function() {
        return new goog.Promise(function(resolve, reject) {
            this.splashScreen_.play();
            resolve();
        }, this);
    }, null, this);

    // Initialize UI components
    this.header_.decorate(goog.dom.getElementsByTagNameAndClass('header')[0]);
    this.menu_.decorate(goog.dom.getElementsByTagNameAndClass('nav', 'navbar', this.header_.getElement())[0]);
    this.responsiveHeader_.decorate(goog.dom.getElementByClass('page-responsive-header'));
};


/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.onApplicationRun = function() {

    if(this.applicationLoaded_ === false) {
        setTimeout(goog.bind(this.onApplicationRun, this), 3000);
    } else {
        goog.events.dispatchEvent(this.splashScreen_, hedgehog.SplashScreen.EventTypes.LOADCOMPLETE);
    }
};


/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.onApplicationLoaded = function() {
    this.applicationLoaded_ = true;
};