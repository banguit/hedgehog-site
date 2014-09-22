goog.provide('hedgehog.controllers.BlogController');

goog.require('hedgehog.core.Controller');
goog.require('hedgehog.ghost');
goog.require('hedgehog.Showdown');

/**
 * @constructor
 * @extends {hedgehog.core.Controller}
 */
hedgehog.controllers.BlogController = function() {
    goog.base(this);
};
goog.inherits(hedgehog.controllers.BlogController, hedgehog.core.Controller);

/**
 * @param {hedgehog.core.Request} request
 * @param {hedgehog.core.Response} response
 */
hedgehog.controllers.BlogController.prototype.index = function(request, response) {
    var converter = new hedgehog.Showdown.converter();

    hedgehog.ghost.loadPosts(goog.bind(function(data) {
        goog.array.forEach(data['posts'], function(post) {
            post['pretty_date'] = this.prettyDate_(post['created_at']);
            post['datetime'] = new Date(post['created_at']).yyyymmdd();
            post['html_preview'] = converter.makeHtml(post['markdown'].split(" ").splice(0, 100).join(" ") + "...");
        }, this);

        console.dir(data);

        response.render(hedgehog.templates.blog, data, goog.dom.getElement('content'));
    }, this));
};

/**
 * Takes an ISO time and returns a string representing how long ago the date represents.
 * @param time
 * @return {string}
 * @private
 * @suppress {checkTypes}
 */
hedgehog.controllers.BlogController.prototype.prettyDate_ = function(time){
    var date = new Date((time || "")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
        return;

    return day_diff == 0 && (
        diff < 60 && "just now" ||
        diff < 120 && "1 minute ago" ||
        diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
        diff < 7200 && "1 hour ago" ||
        diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
        day_diff == 1 && "Yesterday" ||
        day_diff < 7 && day_diff + " days ago" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}
