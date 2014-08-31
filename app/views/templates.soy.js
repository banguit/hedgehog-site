// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace hedgehog.templates.
 */

goog.provide('hedgehog.templates');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
hedgehog.templates.loader = function(opt_data, opt_ignored) {
  return '<div id="ajax-overlay" style="display: none;"><div></div></div>';
};
if (goog.DEBUG) {
  hedgehog.templates.loader.soyTemplateName = 'hedgehog.templates.loader';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
hedgehog.templates.splashscreen = function(opt_data, opt_ignored) {
  return '<div id="splash-screen" class="splash-screen"><div class="splash-screen-content"><div class="hedgehog"><div class="hedgehog-left-eye"></div><div class="hedgehog-right-eye"></div><div class="hedgehog-front-left-leg"></div><div class="hedgehog-front-right-leg"></div><div class="hedgehog-back-right-leg"></div></div><div class="sitename"><small>Den of</small> hedgehog</div></div></div>';
};
if (goog.DEBUG) {
  hedgehog.templates.splashscreen.soyTemplateName = 'hedgehog.templates.splashscreen';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
hedgehog.templates.about = function(opt_data, opt_ignored) {
  return '<div id="about"><h2 class="container">Who am I?</h2><p class="me"></p><div class="container"><p>\u041F\u0440\u0438\u0432\u0435\u0442 %username%! \u041C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 \u0414\u0438\u043C\u0430 \u0410\u043D\u0442\u043E\u043D\u0435\u043D\u043A\u043E, \u0434\u0440\u0443\u0437\u044C\u044F \u0438 \u0437\u043D\u0430\u043A\u043E\u043C\u044B\u0435 \u043D\u0430\u0437\u044B\u0432\u0430\u044E\u0442 \u0401\u0436\u0438\u043A\u043E\u043C, \u0441 \u0434\u0435\u0442\u0441\u0442\u0432\u0430 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043B\u043E\u0441\u044C \u043E\u0442 \u0431\u0440\u0430\u0442\u0430, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u044F \u043F\u0440\u043E\u044F\u0432\u043B\u044F\u044E \u0441\u0438\u043C\u043F\u0430\u0442\u0438\u044E \u043A \u044D\u0442\u0438\u043C \u0437\u0432\u0435\u0440\u044E\u0448\u043A\u0430\u043C =).</p><p>\u0412 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u0436\u0438\u0432\u0443 \u0432 \u041A\u0438\u0435\u0432\u0435 \u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E \u0432 \u0440\u043E\u043B\u0438 ASP.NET MVC/UI Tech Lead \u0432 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 Betsson. \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0441\u0442\u044C\u044E \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0434\u043B\u044F Web \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C Microsoft ASP.NET MVC \u0438 \u0421#, \u043D\u043E \u044F \u0442\u0430\u043A \u0436\u0435 \u0433\u043E\u0440\u044F\u0447\u0451 \u043B\u0443\u0431\u043B\u044E \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0443\u044E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u0438 \u043E\u0447\u0435\u043D\u044C \u043C\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u0443\u044E \u043D\u0430 JavaScript.</p></div></div>';
};
if (goog.DEBUG) {
  hedgehog.templates.about.soyTemplateName = 'hedgehog.templates.about';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
hedgehog.templates.blog = function(opt_data, opt_ignored) {
  return '<div id="blog" class="container"><h1>Blog posts will be here!</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices cursus quam, nec interdum felis viverra nec. Nunc sit amet bibendum lorem. Integer hendrerit volutpat mauris, sed venenatis lorem. Fusce a pretium ante. Aliquam vitae nulla et magna ultricies tristique vel sit amet ante. Mauris et odio ac odio pharetra posuere. Donec semper porta mauris et mollis. Curabitur quam diam, faucibus vitae elit non, gravida aliquam arcu. Vivamus at urna pellentesque, mattis justo ut, dictum nisl. Proin sagittis erat vel condimentum semper. Etiam vestibulum enim dolor, vel auctor lorem hendrerit id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras maximus maximus justo. Phasellus pulvinar vehicula ornare. Cras eu est est. </p></div>';
};
if (goog.DEBUG) {
  hedgehog.templates.blog.soyTemplateName = 'hedgehog.templates.blog';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
hedgehog.templates.projects = function(opt_data, opt_ignored) {
  return '<div id="projects" class="container"><h1>Information about projects will be here!</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices cursus quam, nec interdum felis viverra nec. Nunc sit amet bibendum lorem. Integer hendrerit volutpat mauris, sed venenatis lorem. Fusce a pretium ante. Aliquam vitae nulla et magna ultricies tristique vel sit amet ante. Mauris et odio ac odio pharetra posuere. Donec semper porta mauris et mollis. Curabitur quam diam, faucibus vitae elit non, gravida aliquam arcu. Vivamus at urna pellentesque, mattis justo ut, dictum nisl. Proin sagittis erat vel condimentum semper. Etiam vestibulum enim dolor, vel auctor lorem hendrerit id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras maximus maximus justo. Phasellus pulvinar vehicula ornare. Cras eu est est. </p></div>';
};
if (goog.DEBUG) {
  hedgehog.templates.projects.soyTemplateName = 'hedgehog.templates.projects';
}
