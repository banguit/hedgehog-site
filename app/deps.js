// This file was autogenerated by calcdeps.py
goog.addDependency("../../../../tools/closure-templates/soyutils.js", [], []);
goog.addDependency("../../../../tools/closure-templates/soyutils_usegoog.js", ['soy', 'soy.StringBuilder', 'soy.esc', 'soydata', 'soydata.SanitizedHtml', 'soydata.SanitizedHtmlAttribute', 'soydata.SanitizedJs', 'soydata.SanitizedJsStrChars', 'soydata.SanitizedUri', 'soydata.VERY_UNSAFE'], ['goog.asserts', 'goog.dom.DomHelper', 'goog.format', 'goog.i18n.BidiFormatter', 'goog.i18n.bidi', 'goog.soy', 'goog.soy.data.SanitizedContentKind', 'goog.string', 'goog.string.StringBuffer']);
goog.addDependency("../../../PlastronJS/collection.js", ['mvc.Collection'], ['goog.events.Event', 'goog.events.EventTarget', 'mvc.Model', 'mvc.Mod', 'mvc.Filter']);
goog.addDependency("../../../PlastronJS/control.js", ['mvc.Control'], ['goog.dom', 'goog.object', 'mvc.Layout']);
goog.addDependency("../../../PlastronJS/layout.js", ['mvc.Layout'], ['goog.dom', 'goog.object', 'goog.ui.Component']);
goog.addDependency("../../../PlastronJS/mediator.js", ['mvc.Mediator'], ['goog.array', 'goog.object']);
goog.addDependency("../../../PlastronJS/mod.js", ['mvc.Mod', 'mvc.Filter'], []);
goog.addDependency("../../../PlastronJS/model.js", ['mvc.Model', 'mvc.Model.ValidateError'], ['goog.array', 'goog.events', 'goog.events.EventTarget', 'goog.json', 'goog.object', 'mvc.Sync']);
goog.addDependency("../../../PlastronJS/router.js", ['mvc.Router'], ['goog.History', 'goog.array', 'goog.events', 'goog.history.Html5History']);
goog.addDependency("../../../PlastronJS/store.js", ['mvc.Store'], ['goog.events', 'goog.object', 'mvc.Model']);
goog.addDependency("../../../PlastronJS/plovr/catchapp.js", [], []);
goog.addDependency("../../../PlastronJS/plovr/config.js", [], []);
goog.addDependency("../../../PlastronJS/plovr/test.js", [], []);
goog.addDependency("../../../PlastronJS/sync/ajax.js", ['mvc.AjaxSync'], ['goog.Uri.QueryData', 'goog.net.XhrManager', 'mvc.Sync']);
goog.addDependency("../../../PlastronJS/sync/local.js", ['mvc.LocalSync'], ['goog.storage.Storage', 'goog.storage.mechanism.HTML5LocalStorage', 'mvc.Sync']);
goog.addDependency("../../../PlastronJS/sync/sync.js", ['mvc.Sync'], []);
goog.addDependency("../../../PlastronJS/tests/collection_test.js", [], ['goog.testing.PropertyReplacer', 'goog.testing.jsunit', 'mvc.Collection', 'mvc.Model']);
goog.addDependency("../../../PlastronJS/tests/control_test.js", [], ['goog.dom', 'goog.testing.jsunit', 'mvc.Control', 'mvc.Model']);
goog.addDependency("../../../PlastronJS/tests/layout_test.js", [], ['goog.dom', 'goog.testing.jsunit', 'mvc.Layout']);
goog.addDependency("../../../PlastronJS/tests/mediator_test.js", [], ['goog.testing.jsunit', 'mvc.Mediator']);
goog.addDependency("../../../PlastronJS/tests/mod_test.js", [], ['goog.testing.PropertyReplacer', 'goog.testing.jsunit', 'mvc.Mod', 'mvc.Collection', 'mvc.Model']);
goog.addDependency("../../../PlastronJS/tests/model_test.js", [], ['goog.testing.jsunit', 'mvc.Model', 'mvc.Model.ValidateError']);
goog.addDependency("../../../PlastronJS/tests/router_test.js", [], ['goog.testing.ContinuationTestCase', 'goog.testing.jsunit', 'mvc.Router']);
goog.addDependency("../../../PlastronJS/tests/store_test.js", [], ['goog.testing.jsunit', 'mvc.Collection', 'mvc.Model', 'mvc.Store']);
goog.addDependency("../../../PlastronJS/tests/test_deps.js", [], []);
goog.addDependency("../../../../app/app.js", ['hedgehog'], ['hedgehog.core.Application', 'hedgehog.controllers.AboutController', 'hedgehog.controllers.BlogController', 'hedgehog.controllers.ProjectsController', 'hedgehog.filters.ComponentsInitializationActionFilter', 'hedgehog.filters.ComponentsInitializationApplicationFilter']);
goog.addDependency("../../../../app/deps.js", [], []);
goog.addDependency("../../../../app/externs.js", [], []);
goog.addDependency("../../../../app/requirements.js", [], ['hedgehog']);
goog.addDependency("../../../../app/components/ghost.js", ['hedgehog.ghost', 'hedgehog.ghost.GhostSession'], ['goog.net.XhrIo', 'goog.Promise', 'goog.string.format', 'goog.uri.utils']);
goog.addDependency("../../../../app/components/header.js", ['hedgehog.Header'], ['goog.ui.Component', 'goog.dom']);
goog.addDependency("../../../../app/components/loader.js", ['hedgehog.Loader'], ['goog.ui.Component', 'goog.dom', 'goog.soy', 'goog.style', 'hedgehog.templates']);
goog.addDependency("../../../../app/components/menu.js", ['hedgehog.Menu'], ['goog.ui.Component', 'goog.dom.classlist', 'goog.dom.dataset']);
goog.addDependency("../../../../app/components/responsiveheader.js", ['hedgehog.ResponsiveHeader'], ['goog.ui.Component', 'goog.dom']);
goog.addDependency("../../../../app/components/showdown.js", ['hedgehog.Showdown'], []);
goog.addDependency("../../../../app/components/splashscreen.js", ['hedgehog.SplashScreen'], ['goog.ui.Component', 'goog.dom', 'goog.style', 'hedgehog.templates', 'goog.soy', 'goog.fx', 'goog.fx.dom', 'goog.fx.AnimationQueue', 'goog.fx.AnimationSerialQueue', 'goog.fx.AnimationParallelQueue', 'goog.labs.userAgent.device']);
goog.addDependency("../../../../app/controllers/aboutсontroller.js", ['hedgehog.controllers.AboutController'], ['hedgehog.core.Controller', 'hedgehog.templates']);
goog.addDependency("../../../../app/controllers/blogсontroller.js", ['hedgehog.controllers.BlogController'], ['hedgehog.core.Controller', 'hedgehog.ghost', 'hedgehog.Showdown']);
goog.addDependency("../../../../app/controllers/projectsсontroller.js", ['hedgehog.controllers.ProjectsController'], ['hedgehog.core.Controller']);
goog.addDependency("../../../../app/core/actionfilter.js", ['hedgehog.core.ActionFilter'], []);
goog.addDependency("../../../../app/core/application.js", ['hedgehog.core.Application'], ['mvc.Router', 'goog.string', 'goog.events.EventTarget', 'hedgehog.core.Request', 'hedgehog.core.Response', 'hedgehog.core.types.ActionFilterItem', 'hedgehog.core.events.ActionEvent', 'hedgehog.core.events.ActionExceptionEvent']);
goog.addDependency("../../../../app/core/applicationfilter.js", ['hedgehog.core.ApplicationFilter'], []);
goog.addDependency("../../../../app/core/controller.js", ['hedgehog.core.Controller'], []);
goog.addDependency("../../../../app/core/request.js", ['hedgehog.core.Request'], ['goog.Uri']);
goog.addDependency("../../../../app/core/response.js", ['hedgehog.core.Response'], ['goog.soy']);
goog.addDependency("../../../../app/core/events/actionevent.js", ['hedgehog.core.events.ActionEvent'], ['goog.events.Event', 'hedgehog.core.types.ActionFilterContext']);
goog.addDependency("../../../../app/core/events/actionexceptionevent.js", ['hedgehog.core.events.ActionExceptionEvent'], ['hedgehog.core.events.ActionEvent']);
goog.addDependency("../../../../app/core/types/actionfiltercontext.js", ['hedgehog.core.types.ActionFilterContext'], []);
goog.addDependency("../../../../app/core/types/actionfilteritem.js", ['hedgehog.core.types.ActionFilterItem'], ['hedgehog.core.types.ApplicationFilterItem']);
goog.addDependency("../../../../app/core/types/applicationfilteritem.js", ['hedgehog.core.types.ApplicationFilterItem'], []);
goog.addDependency("../../../../app/filters/componentsinitializationactionfilter.js", ['hedgehog.filters.ComponentsInitializationActionFilter'], ['hedgehog.core.ActionFilter', 'hedgehog.Menu', 'hedgehog.Loader']);
goog.addDependency("../../../../app/filters/componentsinitializationapplicationfilter.js", ['hedgehog.filters.ComponentsInitializationApplicationFilter'], ['hedgehog.core.ApplicationFilter', 'hedgehog.SplashScreen', 'hedgehog.Header', 'hedgehog.Menu', 'hedgehog.ResponsiveHeader']);
goog.addDependency("../../../../app/views/templates.soy.js", ['hedgehog.templates'], ['soy', 'soydata']);
