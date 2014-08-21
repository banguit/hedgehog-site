// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('hedgehog.templates');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
hedgehog.templates.loader = function(opt_data, opt_ignored) {
  return '<div id="ajax-overlay" style="display: none;"><div></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
hedgehog.templates.splashscreen = function(opt_data, opt_ignored) {
  return '<div id="splash-screen" class="splash-screen"><div class="splash-screen-content"><div class="hedgehog"><div class="hedgehog-left-eye"></div><div class="hedgehog-right-eye"></div><div class="hedgehog-front-left-leg"></div><div class="hedgehog-front-right-leg"></div><div class="hedgehog-back-right-leg"></div></div><div class="sitename"><small>Den of</small> hedgehog</div></div></div>';
};
