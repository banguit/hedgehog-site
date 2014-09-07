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
hedgehog.templates.blog = function(opt_data, opt_ignored) {
  return '<div id="blog"><div class="photo"><h1 class="container">Blog</h1></div><div class="container content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices cursus quam, nec interdum felis viverra nec. Nunc sit amet bibendum lorem. Integer hendrerit volutpat mauris, sed venenatis lorem. Fusce a pretium ante. Aliquam vitae nulla et magna ultricies tristique vel sit amet ante. Mauris et odio ac odio pharetra posuere. Donec semper porta mauris et mollis. Curabitur quam diam, faucibus vitae elit non, gravida aliquam arcu. Vivamus at urna pellentesque, mattis justo ut, dictum nisl. Proin sagittis erat vel condimentum semper. Etiam vestibulum enim dolor, vel auctor lorem hendrerit id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras maximus maximus justo. Phasellus pulvinar vehicula ornare. Cras eu est est.</div></div>';
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
  return '<div id="projects"><div class="photo"><h1 class="container">Projects</h1></div><div class="container content"><h2>Development tools</h2><div class="project-item fluent-filters"><h4 class="media-heading">Fluent Filters for ASP.NET MVC</h4>A small library that can be used as a facility for add support of criteria for global action filters in ASP.NET MVC.<div><i class="fa fa-external-link-square"></i> <a href="http://fluentfilters.codeplex.com/">http://fluentfilters.codeplex.com/</a></div></div><br /><h2>End user services</h2><div class="project-item pubwebkit"><h4 class="media-heading">Pubwebkit</h4>A cloud service that helps you prepare digital editions and share it with friends or publish for sell.<div><i class="fa fa-external-link-square"></i> <a href="http://fluentfilters.codeplex.com/">http://www.pubwebkit.com/</a></div></div></div></div>';
};
if (goog.DEBUG) {
  hedgehog.templates.projects.soyTemplateName = 'hedgehog.templates.projects';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
hedgehog.templates.about = function(opt_data, opt_ignored) {
  return '<div id="about"><div class="photo"><h1 class="container">Who am I?</h1></div><div class="container introduction"><p>Hello %username%! My name is Dmitry Antonenko and I a developer with warm love to the web. My goal is to developing so it\'s beautifully simple and fast.</p><p>Currently I live in Kiev and working as ASP.NET MVC / UI Tech Lead in the company <a href="http://www.betsson.com">Betsson</a>.</p><p>I do not specialize in one programming language or platform, I love to use all possible means to develop. I love to develop for front-end as well as for back-end ( but yes, front-end I like a little bit more <i class="fa fa-smile-o"></i> ) Also like learn different algorithmic approaches that could be applied in development process.</p></div><div class="container contacts"><h2>Contact me</h2><p>If you have interesting proposal, you want to make friends <del>or you have a lot of money and you want to share some with me</del>, be sure to write to me! <del>Especially if you have a lot of money.</del></p><div class="row"><div class="col-xs-6 col-sm-3"><a href="tel:+380675040586" class="fa-stack fa-3x"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-phone fa-inverse fa-stack"></i></a><span>+38(067)504-05-86</span></div><div class="col-xs-6 col-sm-3"><a href="mailto:dmitry.antonenko@hedgehog.com.ua" class="fa-stack fa-3x"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-envelope fa-inverse fa-stack"></i></a><span>dmitry.antonenko [at] hedgehog.com.ua</span></div><div class="col-xs-6 col-sm-3"><a href="skype:dmitry_antonenko" class="fa-stack fa-3x"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-skype fa-inverse fa-stack"></i></a><span>dmitry_antonenko</span></div><div class="col-xs-6 col-sm-3"><a href="https://www.linkedin.com/in/dmitryantonenko" class="fa-stack fa-3x"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-inverse fa-stack"></i></a><span>dmitryantonenko</span></div><div class="col-xs-6 col-sm-3"><a href="https://www.facebook.com/dmitry.antonenko" class="fa-stack fa-3x"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-inverse fa-stack"></i></a><span>dmitry.antonenko</span></div><div class="col-xs-6 col-sm-3"><a href="https://twitter.com/banguit" class="fa-stack fa-3x"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-inverse fa-stack"></i></a><span>@banguit</span></div><div class="col-xs-6 col-sm-3"><a href="https://github.com/banguit" class="fa-stack fa-3x"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-github fa-inverse fa-stack"></i></a><span>banguit</span></div><div class="col-xs-6 col-sm-3"><a href="https://plus.google.com/+DmitryAntonenko" class="fa-stack fa-3x"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-inverse fa-stack"></i></a><span>+DmitryAntonenko</span></div></div></div></div>';
};
if (goog.DEBUG) {
  hedgehog.templates.about.soyTemplateName = 'hedgehog.templates.about';
}
