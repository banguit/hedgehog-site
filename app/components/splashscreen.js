goog.provide('hedgehog.SplashScreen');

goog.require('goog.ui.Component');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('hedgehog.templates');
goog.require('goog.soy');
goog.require('goog.fx');
goog.require('goog.fx.dom');
goog.require('goog.fx.AnimationQueue');
goog.require('goog.fx.AnimationSerialQueue');
goog.require('goog.fx.AnimationParallelQueue');

// Steps:
// - Wrapper should be hidden
// - Create splash screen
// - Play
// - Render body parallel
// - Fade splash at the end

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hedgehog.SplashScreen = function(mainWrapper) {
    goog.ui.Component.call(this);

    /**
     * @type {Element}
     */
    this.wrapper_ = mainWrapper;

    /**
     * @type {Element}
     */
    this.logo_;

    /**
     * @type {boolean}
     */
    this.active_ = false;
};
goog.inherits(hedgehog.SplashScreen, goog.ui.Component);


/** @inheritDoc */
hedgehog.SplashScreen.prototype.createDom = function() {
    var el = goog.soy.renderAsElement(hedgehog.templates.splashscreen);
    this.logo_ = goog.dom.getElementByClass('logo', el);

    this.setElementInternal(/** @type {Element} */(el));
};


/** @inheritDoc */
hedgehog.SplashScreen.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var el = this.getElement()
      , logo = this.logo_
      , splashSize = goog.style.getSize(el)
      , logoSize = goog.style.getSize(logo);

    // set positions
    goog.style.setPosition(logo, (splashSize.width / 2) - (logoSize.width / 2), splashSize.height + logoSize.height);
    goog.style.setStyle(logo, 'display', 'inline-block');
};


/**
 * Run splash screen animation
 */
hedgehog.SplashScreen.prototype.play = function() {
    this.active_ = true;

    var el = this.getElement()
      , logo = this.logo_
      , splashSize = goog.style.getSize(el)
      , logoSize = goog.style.getSize(logo)
      , logoPosition = goog.style.getPosition(logo)
      , anim = new goog.fx.dom.Slide(logo, [logoPosition.x, logoPosition.y], [logoPosition.x, (splashSize.height / 2) - logoSize.height], 1000, goog.fx.easing.easeOutLong);

    anim.play();
};


/**
 * Complete splash screen animation
 */
hedgehog.SplashScreen.prototype.stop = function() {

    var el = this.getElement()
      , logo = this.logo_
      , logoSize = goog.style.getSize(logo)
      , logoPosition = goog.style.getPosition(logo)
      , anim = new goog.fx.dom.Slide(logo, [logoPosition.x, logoPosition.y], [logoPosition.x, 0 - logoSize.height], 500, goog.fx.easing.easeIn);

    anim.play();

    // TODO: Use animation queue to hide splash screen and show wrapper

//    goog.style.setStyle(el, 'display', 'none');
//    goog.style.setStyle(this.wrapper_, 'display', 'inherit');
    this.active_ = false;
};

/**
 * Complete splash screen animation
 * @return {boolean}
 */
hedgehog.SplashScreen.prototype.isActive = function() {
    return this.active_;
};


/**
 * Component default css class
 * @type {string}
 */
hedgehog.SplashScreen.CSS_CLASS = 'splash-screen';
