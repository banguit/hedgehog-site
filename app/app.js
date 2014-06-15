goog.provide('hedgehog');

goog.require('mvc.Router');

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



    // Setup routes
    var router = new mvc.Router();

    router.route( '{/}', function() {
        console.log('/');
    });

    router.route( '/projects', function() {
        console.log('/projects');
    });

    router.route( '/about', function() {
        console.log('/about');
    });


    // Check current route
    router.checkRoutes();
};
