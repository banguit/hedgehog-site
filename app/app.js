/**
 * @fileoverview The controller/business logic for the application.
 *
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
    // -- Application initialization -- //
    var app = new hedgehog.core.Application();

    // -- Register routes -- //
    // Default route should be wrapped in {.. route definition ..}
    app.mapRoute('{/}{/blog{/}{/:action{/}}{/:id{/}}}', hedgehog.controllers.BlogController); // Default route
    app.mapRoute('/projects{/}', hedgehog.controllers.ProjectsController);
    app.mapRoute('/about{/}{/:action{/}}[?*]', hedgehog.controllers.AboutController);
    // TODO: 404

    // -- Register application filters -- //
    app.addApplicationFilter(new hedgehog.filters.ComponentsInitializationApplicationFilter());

    // -- Register action filters -- //
    app.addActionFilter(new hedgehog.filters.ComponentsInitializationActionFilter(), null, 0);

    // Execute application
    app.run();
};

goog.exportSymbol('app.start', hedgehog.start);