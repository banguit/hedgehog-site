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
    this.initialAnimationCompleted_ = false;
};


/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.onApplicationStart = function() {
    var splashScreen = this.splashScreen_;

    goog.events.listen(splashScreen, hedgehog.SplashScreen.EventTypes.ONSLIDETOCENTERANIMATIONFINISH, this.onSplashScreenInitialAnimationFinish_, false, this);

    // Initialize splash screen
    splashScreen.render();
    splashScreen.play();

    // Initialize UI components
    this.header_.decorate(goog.dom.getElementsByTagNameAndClass('header')[0]);
    this.menu_.decorate(goog.dom.getElementsByTagNameAndClass('nav', 'navbar', this.header_.getElement())[0]);
    this.responsiveHeader_.decorate(goog.dom.getElementByClass('page-responsive-header'));
};


/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.onApplicationRun = function() {
    // TODO: Add CONTENT_READY event processing
    if(this.initialAnimationCompleted_ === false) {
        setTimeout(goog.bind(this.onApplicationRun, this), 3000);
    } else {
        this.splashScreen_.stop();
    }
};


/**
 * @private
 */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.onSplashScreenInitialAnimationFinish_ = function() {
    this.initialAnimationCompleted_ = true;
};