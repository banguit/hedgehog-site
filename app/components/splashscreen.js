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
goog.require('goog.labs.net.image');

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
     * @private
     */
    this.content_;

    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false;

    /**
     * @type {Element}
     * @private
     */
    this.hedgehogBody_;

    /**
     * @type {Element}
     * @private
     */
    this.hedgehogLeftEye_;

    /**
     * @type {Element}
     * @private
     */
    this.hedgehogRightEye_;


    /**
     * @type {Element}
     * @private
     */
    this.hedgehogFrontLeftLeg_;


    /**
     * @type {Element}
     * @private
     */
    this.hedgehogFrontRightLeg_;


    /**
     * @type {Element}
     * @private
     */
    this.hedgehogBackRightLeg_;


    /**
     * @type {boolean}
     * @private
     */
    this.isAnimated_ = false;


    /**
     * @type {goog.fx.dom.SlideFrom}
     * @private
     */
    this.slideContentToCenterAnimation_;


    /**
     * @type {goog.fx.AnimationParallelQueue}
     * @private
     */
    this.hedgehogAnimationParallelQueue1_;


    /**
     * @type {goog.fx.AnimationParallelQueue}
     * @private
     */
    this.hedgehogAnimationParallelQueue2_;
};
goog.inherits(hedgehog.SplashScreen, goog.ui.Component);


/** @inheritDoc */
hedgehog.SplashScreen.prototype.createDom = function() {
    var el = goog.soy.renderAsElement(hedgehog.templates.splashscreen)
      , content = this.content_ = goog.dom.getElementByClass(hedgehog.SplashScreen.CSS_CLASSES.CONTENT, el)
      , getElementByClass = goog.dom.getElementByClass;

    this.hedgehogBody_ = getElementByClass(hedgehog.SplashScreen.CSS_CLASSES.HEDGEHOG_BODY, content);
    this.hedgehogLeftEye_ = getElementByClass(hedgehog.SplashScreen.CSS_CLASSES.HEDGEHOG_LEFT_EYE, content);
    this.hedgehogRightEye_ = getElementByClass(hedgehog.SplashScreen.CSS_CLASSES.HEDGEHOG_RIGHT_EYE, content);
    this.hedgehogFrontLeftLeg_ = getElementByClass(hedgehog.SplashScreen.CSS_CLASSES.HEDGEHOG_FRONT_LEFT_LEG, content);
    this.hedgehogFrontRightLeg_ = getElementByClass(hedgehog.SplashScreen.CSS_CLASSES.HEDGEHOG_FRONT_RIGHT_LEG, content);
    this.hedgehogBackRightLeg_ = getElementByClass(hedgehog.SplashScreen.CSS_CLASSES.HEDGEHOG_BACK_RIGHT_LEG, content);

    this.setElementInternal(/** @type {Element} */(el));
};


/** @inheritDoc */
hedgehog.SplashScreen.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var googStyle = goog.style
      , el = this.getElement()
      , content = this.content_
      , splashSize = googStyle.getSize(el)
      , contentSize = googStyle.getSize(content)
      , contentPositionLeft = (splashSize.width / 2) - (contentSize.width / 2)
      , contentPositionTop = splashSize.height + contentSize.height
      , queueFrontLeftLeg1
      , queueFrontLeftLeg2
      , queue1
      , queue2;

    // Hide hedgehog outside of screen
    googStyle.setPosition(content, contentPositionLeft, contentPositionTop);
    googStyle.setStyle(content, 'display', 'inline-block');

    // Define animation
    this.slideContentToCenterAnimation_ = new goog.fx.dom.SlideFrom(content, [contentPositionLeft, (splashSize.height / 2) - contentSize.height], 800, goog.fx.easing.easeOutLong);
    queue1 = this.hedgehogAnimationParallelQueue1_ = new goog.fx.AnimationParallelQueue();

//    queueFrontLeftLeg1 = new goog.fx.AnimationSerialQueue();
//    queueFrontLeftLeg1.add(new goog.fx.dom.SlideFrom(this.hedgehogFrontLeftLeg_, [23, 75], 250, goog.fx.easing.inAndOut));
//    queueFrontLeftLeg1.add(new goog.fx.dom.SlideFrom(this.hedgehogFrontLeftLeg_, [28, 74], 250, goog.fx.easing.inAndOut));
//    queue1.add(queueFrontLeftLeg1);

    queue2 = this.hedgehogAnimationParallelQueue2_ = new goog.fx.AnimationParallelQueue();
//    queueFrontLeftLeg2 = new goog.fx.AnimationSerialQueue();
//    queueFrontLeftLeg2.add(new goog.fx.dom.SlideFrom(this.hedgehogFrontLeftLeg_, [28, 74], 250, goog.fx.easing.easeOut));
//    queueFrontLeftLeg2.add(new goog.fx.dom.SlideFrom(this.hedgehogBackRightLeg_, [57, 73], 250, goog.fx.easing.easeIn));
//    queue2.add(queueFrontLeftLeg2);

    // Define animation events
    goog.events.listen(this.slideContentToCenterAnimation_, goog.fx.Transition.EventType.FINISH, goog.bind(this.onslideContentToCenterAnimationFinish_, this));
    goog.events.listen(queue1, goog.fx.Transition.EventType.FINISH, goog.bind(this.onHedgehogAnimationParallelQueue1Finish_, this));
    goog.events.listen(queue2, goog.fx.Transition.EventType.FINISH, goog.bind(this.onHedgehogAnimationParallelQueue2Finish_, this));
};


hedgehog.SplashScreen.prototype.onslideContentToCenterAnimationFinish_ = function(event) {
    this.hedgehogAnimationParallelQueue1_.play();
};

hedgehog.SplashScreen.prototype.onslideContentToCenterAnimationStop_ = function(event) {
    this.hedgehogAnimationParallelQueue1_.stop();
    this.hedgehogAnimationParallelQueue2_.play();
};


hedgehog.SplashScreen.prototype.onHedgehogAnimationParallelQueue1Finish_ = function(event) {
    this.hedgehogAnimationParallelQueue2_.play();
};


hedgehog.SplashScreen.prototype.onHedgehogAnimationParallelQueue2Finish_ = function(event) {
    this.hedgehogAnimationParallelQueue1_.play();
};

/**
 * Run splash screen animation
 */
hedgehog.SplashScreen.prototype.play = function() {
    this.active_ = true;

    // Preload logo image and play animation
//    var backgroundImageStyle = googStyle.getComputedStyle(logo, 'background-image')
//      , logoUrl = (backgroundImageStyle.match( /url\([^\)]+\)/gi ) || [""])[0].split(/[()'"]+/)[1];

//    goog.labs.net.image.load(logoUrl).then(function() {
//        anim.play();
//    });

    this.slideContentToCenterAnimation_.play();
};


/**
 * Complete splash screen animation
 */
hedgehog.SplashScreen.prototype.stop = function() {

    var el = this.getElement()
      , logo = this.content_
      , logoSize = goog.style.getSize(logo)
      , logoPosition = goog.style.getPosition(logo);

    var queue = new goog.fx.AnimationSerialQueue();

    // Hide logo and splash-screen block
    queue.add(new goog.fx.dom.SlideFrom(logo, [logoPosition.x, 0 - logoSize.height], 500, goog.fx.easing.easeIn));
    queue.add(new goog.fx.dom.FadeInAndShow(this.wrapper_, 250));
    queue.add(new goog.fx.dom.FadeOutAndHide(el, 1));
    queue.play();

    this.active_ = false;
};


/**
 * Complete splash screen animation
 * @return {boolean}
 */
hedgehog.SplashScreen.prototype.isActive = function() {
    return this.active_;
};


/** @enum {string} */
hedgehog.SplashScreen.CSS_CLASSES = {
    MAIN : 'splash-screen',
    CONTENT : 'splash-screen-content',
    HEDGEHOG_BODY : 'hedgehog',
    HEDGEHOG_LEFT_EYE : 'hedgehog-left-eye',
    HEDGEHOG_RIGHT_EYE : 'hedgehog-right-eye',
    HEDGEHOG_FRONT_LEFT_LEG : 'hedgehog-front-left-leg',
    HEDGEHOG_FRONT_RIGHT_LEG : 'hedgehog-front-right-leg',
    HEDGEHOG_BACK_RIGHT_LEG : 'hedgehog-back-right-leg'
};
