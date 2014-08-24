goog.provide('hedgehog');

goog.require('goog.dom');
goog.require('mvc.Router');
goog.require('hedgehog.Header');
goog.require('hedgehog.Menu');
goog.require('hedgehog.Loader');
goog.require('hedgehog.ResponsiveHeader');
goog.require('hedgehog.SplashScreen');

/**
 * @fileoverview The controller/business logic for the application.
 */

/**
 * Enum for the possible route values
 * @enum {!string}
 */
hedgehog.Route = {
    BLOG: '/',
    PROJECTS: '/projects',
    ABOUT: '/about'
};

hedgehog.TITLE_SLOGAN = 'Den of hedgehog | Dmitry Antonenko personal website';


window.onload = function() {

    // Show splash screeen
    var wrapperElement = goog.dom.getElementByClass(hedgehog.CSS_CLASSES.WRAPPER)
      , splashScreen = new hedgehog.SplashScreen(wrapperElement);

    splashScreen.render();
    splashScreen.play();

    // Setup UI
    var content = goog.dom.getElement('content')
      , header = new hedgehog.Header()
      , menu = new hedgehog.Menu()
      , loader = new hedgehog.Loader()
      , responsiveHeader = new hedgehog.ResponsiveHeader(wrapperElement);

    loader.render(content);
    loader.show(true);

    header.decorate(goog.dom.getElementsByTagNameAndClass('header')[0]);
    menu.decorate(goog.dom.getElementsByTagNameAndClass('nav', 'navbar', header.getElement())[0]);
    responsiveHeader.decorate(goog.dom.getElementByClass(hedgehog.CSS_CLASSES.RESPONSIVE_HEADER));

    // Setup routes
    var router = new mvc.Router();

    var routeCallback = goog.partial(hedgehog.routeCallback_, splashScreen, responsiveHeader, loader, menu)
      , blogRouteCallback = goog.bind(routeCallback, this, '/', 'Blog')
      , projectsRouteCallback = goog.bind(routeCallback, this, '/projects', 'Projects')
      , aboutRouteCallback = goog.bind(routeCallback, this, '/about', 'About me');

    router.route( '{/}', blogRouteCallback);
    router.route( '/projects', projectsRouteCallback);
    router.route( '/about', aboutRouteCallback);

    // TODO: 404

    // Check current route
    router.checkRoutes();
};


/**
 * Function to processing route request
 * @param {hedgehog.ResponsiveHeader} responsiveHeader
 * @param {hedgehog.SplashScreen} splashScreen
 * @param {hedgehog.Loader} loader
 * @param {hedgehog.Menu} menu
 * @param {string} route
 * @param {string} pageName
 * @private
 */
hedgehog.routeCallback_ = function(splashScreen, responsiveHeader, loader, menu, route, pageName) {
    loader.show(true);
    menu.setActive('#' + route);

    // Set responsive header and page titles
    document.title = hedgehog.TITLE_SLOGAN + ' | ' + pageName;
    responsiveHeader.setTitle(pageName);

    setTimeout(function() { // NOTE: setTimeout for test purpose only
        loader.show(false);
        if(splashScreen.isActive()) {
            splashScreen.stop();
        }
    }, 3000);
};


/**
 * Predefined CSS classes
 * @enum {string}
 */
hedgehog.CSS_CLASSES = {
    WRAPPER : 'wrapper',
    RESPONSIVE_HEADER : 'page-responsive-header'
}