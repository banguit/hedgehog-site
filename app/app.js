/**
 * @fileoverview The controller/business logic for the application.
 * @author banguit@gmail.com (Dmitry Antonenko)
 */

goog.provide('hedgehog');

goog.require('hedgehog.core.Application');
goog.require('hedgehog.controllers.AboutController');
goog.require('hedgehog.controllers.BlogController');
goog.require('hedgehog.controllers.ProjectsController');
goog.require('hedgehog.filters.ComponentsInitializationActionFilter');
goog.require('hedgehog.filters.ComponentsInitializationApplicationFilter');


/**
 * Initializes the application
 */
hedgehog.start = function() {

    hedgehog.bindReady_(function() {
        // -- Application initialization -- //
        var app = new hedgehog.core.Application();

        // -- Register routes -- //
        // Default route should be wrapped in {.. route definition ..}
        app.mapRoute('{!}{/}{/blog{/}}', hedgehog.controllers.BlogController); // Default route
        app.mapRoute('{!}/blog/{:action}/:slug{/}', hedgehog.controllers.BlogController);
        app.mapRoute('{!}/projects{/}', hedgehog.controllers.ProjectsController);
        app.mapRoute('{!}/about{/}', hedgehog.controllers.AboutController);

        // -- Register application filters -- //
        app.addApplicationFilter(new hedgehog.filters.ComponentsInitializationApplicationFilter());

        // -- Register action filters -- //
        app.addActionFilter(new hedgehog.filters.ComponentsInitializationActionFilter(), null, 0);

        // Execute application
        app.run();
    });
};

/**
 * @param {Function} handler
 * @private
 */
hedgehog.bindReady_ = function(handler) {

    var called = false;

    function ready() {
        if (called) { return; }
        called = true;
        handler();
    };

    function tryScroll(){
        if (called) { return; }
        try {
            document.documentElement.doScroll("left");
            ready();
        } catch(e) {
            setTimeout(tryScroll, 10);
        }
    };

    if ( document.addEventListener ) { // native event
        document.addEventListener( "DOMContentLoaded", ready, false);
    } else if ( document.attachEvent ) {  // IE

        try {
            var isFrame = window.frameElement != null;
        } catch(e) {}

        // IE, the document is not inside a frame
        if ( document.documentElement.doScroll && !isFrame ) {
            tryScroll();
        }

        // IE, the document is inside a frame
        document.attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) {
                ready();
            }
        })
    }

    // Old browsers
    if (window.addEventListener)
        window.addEventListener('load', ready, false);
    else if (window.attachEvent) {
        window.attachEvent('onload', ready);
    }
};

goog.exportSymbol('app.start', hedgehog.start);