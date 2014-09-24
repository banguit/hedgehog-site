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
goog.require('goog.labs.userAgent.device');

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
     * @type {goog.fx.dom.SlideFrom}
     * @private
     */
    this.slideContentToCenterAnimation_;


    /**
     * @type {goog.fx.AnimationParallelQueue}
     * @private
     */
    this.hedgehogAnimationParallelQueueForward_;


    /**
     * @type {goog.fx.AnimationParallelQueue}
     * @private
     */
    this.hedgehogAnimationParallelQueueInitial_;
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
      , googFx = goog.fx
      , googFxDom = googFx.dom
      , splashScreenContentEl = this.content_
      , conentPosition = googStyle.getPosition(splashScreenContentEl)
      , queueForward
      , queueInitial
      , queue;

    // Define animation
    this.slideContentToCenterAnimation_ = new googFxDom.SlideFrom(splashScreenContentEl, [conentPosition.x, (conentPosition.y / 2) - splashScreenContentEl.clientHeight], 1000, goog.fx.easing.easeOut);
    queueForward = this.hedgehogAnimationParallelQueueForward_ = new googFx.AnimationParallelQueue();

    queue = new googFx.AnimationSerialQueue();
    queue.add(new googFxDom.SlideFrom(this.hedgehogFrontLeftLeg_, [22, 74], 200));
    queue.add(new googFxDom.SlideFrom(this.hedgehogFrontRightLeg_, [38, 75], 200));
    queueForward.add(queue);
    queueForward.add(new googFxDom.SlideFrom(this.hedgehogBackRightLeg_, [54, 74], 200, goog.fx.easing.easeIn));
    queueForward.add(new googFxDom.SlideFrom(this.hedgehogBody_, [-1, 0], 200, goog.fx.easing.easeIn));

    queueInitial = this.hedgehogAnimationParallelQueueInitial_ = new goog.fx.AnimationParallelQueue();
    queueInitial.add(new googFxDom.SlideFrom(this.hedgehogFrontLeftLeg_, [28, 74], 200, goog.fx.easing.easeOut));
    queueInitial.add(new googFxDom.SlideFrom(this.hedgehogBackRightLeg_, [57, 73], 200));
    queueInitial.add(new googFxDom.SlideFrom(this.hedgehogFrontRightLeg_, [43, 75], 200, goog.fx.easing.easeOut));
    queueInitial.add(new googFxDom.SlideFrom(this.hedgehogBody_, [1, 0], 200, goog.fx.easing.easeOutLong));

    // Initialize animation events
    goog.events.listen(this.slideContentToCenterAnimation_, googFx.Transition.EventType.FINISH, goog.bind(this.onSlideContentToCenterAnimationFinish_, this));
    goog.events.listen(queueForward, googFx.Transition.EventType.FINISH, goog.bind(this.onHedgehogAnimationParallelQueueForwardFinish_, this));
    goog.events.listen(queueInitial, googFx.Transition.EventType.FINISH, goog.bind(this.onHedgehogAnimationParallelQueueInitialFinish_, this));
};


/**
 * @private
 */
hedgehog.SplashScreen.prototype.onSlideContentToCenterAnimationFinish_ = function(event) {
    this.dispatchEvent(hedgehog.SplashScreen.EventTypes.ONSLIDETOCENTERANIMATIONFINISH);
    this.hedgehogAnimationParallelQueueForward_.play();
};


/**
 * @private
 */
hedgehog.SplashScreen.prototype.onHedgehogAnimationParallelQueueForwardFinish_ = function(event) {
    this.hedgehogAnimationParallelQueueInitial_.play();
};


/**
 * @private
 */
hedgehog.SplashScreen.prototype.onHedgehogAnimationParallelQueueInitialFinish_ = function(event) {
    this.hedgehogAnimationParallelQueueForward_.play();
};


/**
 * Get image url of specified element
 * @param {Element} el
 * @return {string} Element background image URL
 * @private
 */
hedgehog.SplashScreen.getElementBackgroundImageUlr_ = function(el) {
    var backgroundImageStyle = goog.style.getComputedStyle(el, 'background-image');
    return (backgroundImageStyle.match( /url\([^\)]+\)/gi ) || [""])[0].split(/[()'"]+/)[1];
};


/**
 * Run splash screen animation
 */
hedgehog.SplashScreen.prototype.play = function() {
    goog.style.setStyle(this.content_, 'visibility', 'visible');

    this.active_ = true;
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
    queue.add(new goog.fx.dom.FadeInAndShow(this.wrapper_, 100));
    queue.add(new goog.fx.dom.FadeOutAndHide(el, 0));
    queue.play();

    this.hedgehogAnimationParallelQueueForward_.stop();
    this.hedgehogAnimationParallelQueueInitial_.stop();

    this.active_ = false;
    goog.events.listenOnce(queue, goog.fx.Transition.EventType.FINISH, function() { this.dispose(); }, false, this);
};


/**
 * Complete splash screen animation
 * @return {boolean}
 */
hedgehog.SplashScreen.prototype.isActive = function() {
    return this.active_;
};


/** @inheritDoc */
hedgehog.SplashScreen.prototype.disposeInternal = function() {
    goog.base(this, 'disposeInternal');

    goog.dispose(this.hedgehogBody_);
    goog.dispose(this.hedgehogLeftEye_);
    goog.dispose(this.hedgehogRightEye_);
    goog.dispose(this.hedgehogFrontLeftLeg_);
    goog.dispose(this.hedgehogFrontRightLeg_);
    goog.dispose(this.hedgehogBackRightLeg_);

    goog.events.unlisten(this.slideContentToCenterAnimation_, goog.fx.Transition.EventType.FINISH, goog.bind(this.onSlideContentToCenterAnimationFinish_, this));
    goog.events.unlisten(this.hedgehogAnimationParallelQueueForward_, goog.fx.Transition.EventType.FINISH, goog.bind(this.onHedgehogAnimationParallelQueueForwardFinish_, this));
    goog.events.unlisten(this.hedgehogAnimationParallelQueueInitial_, goog.fx.Transition.EventType.FINISH, goog.bind(this.onHedgehogAnimationParallelQueueInitialFinish_, this));
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


hedgehog.SplashScreen.EventTypes = {
    ONSLIDETOCENTERANIMATIONFINISH: goog.events.getUniqueId('onSlideContentToCenterAnimationFinish')
};