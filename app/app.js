goog.provide('hedgehog');

goog.require('mvc.Router');
goog.require('hedgehog.Header');
goog.require('hedgehog.Menu');

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
    var header = new hedgehog.Header()
      , menu = new hedgehog.Menu();

    header.decorate(goog.dom.getElementsByTagNameAndClass('header')[0]);
    menu.decorate(goog.dom.getElementsByTagNameAndClass('nav', 'navbar', header.getElement())[0]);

    // Setup routes
    var router = new mvc.Router();

    router.route( '{/}', function() {
        menu.setActive('#/');
    });

    router.route( '/projects', function() {
        menu.setActive('#/projects');
    });

    router.route( '/about', function() {
        menu.setActive('#/about');
    });


    // Check current route
    router.checkRoutes();
};
