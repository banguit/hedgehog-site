/**
 * @fileoverview The controller/business logic for the application.
 *
 * @author banguit@gmail.com (Dmitry Antonenko)
 */

goog.provide('hedgehog');

goog.require('mvc.Router');
goog.require('hedgehog.Loader');
goog.require('hedgehog.templates');
goog.require('goog.soy');

goog.require('hedgehog.core.Application');
goog.require('hedgehog.controllers.AboutController');
goog.require('hedgehog.controllers.BlogController');
goog.require('hedgehog.controllers.ProjectsController');
goog.require('hedgehog.filters.SplashScreenActionFilter');
goog.require('hedgehog.filters.ComponentsInitializationApplicationFilter');


/**
 * Initializes the application
 */
hedgehog.start = function() {
    // -- Application initialization -- //
    var app = new hedgehog.core.Application();

    // -- Register routes -- //
    // Default route should be wrapped in {.. route definition ..}
    app.mapRoute('{/blog{/}{/:action{/}}{/:id{/}}}', hedgehog.controllers.BlogController); // Default route
    app.mapRoute('/projects{/}', hedgehog.controllers.ProjectsController);
    app.mapRoute('/about{/}{/:action{/}}[?*]', hedgehog.controllers.AboutController);
    // TODO: 404

    // -- Register application filters -- //
    app.addApplicationFilter(new hedgehog.filters.ComponentsInitializationApplicationFilter());

    // -- Register action filters -- //
    app.addActionFilter(new hedgehog.filters.SplashScreenActionFilter(), null, 0);

    app.run();
};

//hedgehog.TITLE_SLOGAN = 'Den of hedgehog | Dmitry Antonenko personal website';
//
//
//hedgehog.routeCallback_ = function(splashScreen, responsiveHeader, loader, menu, route, pageName) {
//    loader.show(true);
//    menu.setActive('#' + route);
//
//    // Set responsive header and page titles
//    document.title = hedgehog.TITLE_SLOGAN + ' | ' + pageName;
//    responsiveHeader.setTitle(pageName);
//
//    setTimeout(function() { // NOTE: setTimeout for test purpose only
//        loader.show(false);
//        if(splashScreen.isActive()) {
//            splashScreen.stop();
//        }
//    }, 3000);
//};

goog.exportSymbol('app.start', hedgehog.start);