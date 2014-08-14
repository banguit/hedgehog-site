goog.provide('hedgehog');

goog.require('goog.dom');
goog.require('mvc.Router');
goog.require('hedgehog.Header');
goog.require('hedgehog.Menu');
goog.require('hedgehog.Loader');
goog.require('hedgehog.ResponsiveHeader');

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


window.onload = function() {

    // Setup UI
    var content = goog.dom.getElement('content')
      , header = new hedgehog.Header()
      , menu = new hedgehog.Menu()
      , loader = new hedgehog.Loader()
      , wrapperElement = goog.dom.getElementByClass('wrapper')
      , responsiveHeader = new hedgehog.ResponsiveHeader(wrapperElement);

    loader.render(content);
    loader.show(true);

    header.decorate(goog.dom.getElementsByTagNameAndClass('header')[0]);
    menu.decorate(goog.dom.getElementsByTagNameAndClass('nav', 'navbar', header.getElement())[0]);
    responsiveHeader.decorate(goog.dom.getElementByClass('page-responsive-header'));

    // Setup routes
    var router = new mvc.Router();

    router.route( '{/}', function() {
        loader.show(true);
        menu.setActive('#/');

        setTimeout(function() {
            loader.show(false);
        }, 1000);
    });

    router.route( '/projects', function() {
        loader.show(true);
        menu.setActive('#/projects');


        setTimeout(function() {
            loader.show(false);
        }, 1000);
    });

    router.route( '/about', function() {
        loader.show(true);
        menu.setActive('#/about');


        setTimeout(function() {
            loader.show(false);
        }, 1000);
    });

    // Check current route
    router.checkRoutes();
};
