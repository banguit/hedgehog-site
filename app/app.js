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

    hedgehog.contentLoaded(window, function() {
        // -- Application initialization -- //
        var app = new hedgehog.core.Application();

        // -- Register routes -- //
        // Default route should be wrapped in {.. route definition ..}
        app.mapRoute('{!}{/}{/blog{/}}', hedgehog.controllers.BlogController); // Default route
        app.mapRoute('{!}/blog/page/:page{/}', hedgehog.controllers.BlogController);
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

hedgehog.contentLoaded = function (win, fn) {
    var done = false, top = true,
        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,
        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',
        init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },
        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };
    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (!modern && root.doScroll) {
            try { top = !win.frameElement; } catch(e) { }
            if (top) poll();
        }
        doc[add](pre + 'DOMContentLoaded', init, false);
        doc[add](pre + 'readystatechange', init, false);
        win[add](pre + 'load', init, false);
    }
};

goog.exportSymbol('app.start', hedgehog.start);