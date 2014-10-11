/**
 * @fileoverview This component used to access ghost public JSON API
 * @author banguit@gmail.com (Dmitry Antonenko)
 */

goog.provide('hedgehog.ghost');

goog.require('goog.net.XhrIo');
goog.require('goog.Promise');
goog.require('goog.string.format');
goog.require('goog.uri.utils');


/**
 * @const
 * @type {string}
 */
hedgehog.ghost.API_URI_BASE = '/api/public/';


/**
 * Get all posts.
 *
 * Options:
 *      page - pagination (default: 1)
 *      limit - number of posts per page (default: 15)
 *      status - status of the page (all, published, draft)
 *      staticPages - include static pages (default: false)
 *
 * @param {Function} callback
 * @param {number=} opt_page
 * @param {number=} opt_limit
 * @param {string=} opt_status
 * @param {boolean=} opt_staticPages !!!currently not used in request
 */
hedgehog.ghost.loadPosts = function(callback, opt_page, opt_limit, opt_status, opt_staticPages) {
    opt_page = isNaN(opt_page) ? 1 : opt_page;
    opt_limit = goog.isDefAndNotNull(opt_limit) ? opt_limit : 10;
    opt_status = goog.isDefAndNotNull(opt_status) ? opt_status : 'published';

    var getData = {
        'page': opt_page,
        'limit': opt_limit,
        'status': opt_status
    };

    hedgehog.ghost.loadTags().then(function(data) {
        var xhrio = new goog.net.XhrIo();

        goog.events.listen(xhrio, goog.net.EventType.COMPLETE, goog.bind(function(e) {
            var xhr = /** @type {goog.net.XhrIo} */ (e.target)
              , result = xhr.getResponseJson();

            goog.object.extend(/** @type {Object|null} */(result), {'tags' : data['tags']});
            callback(result);

            goog.dispose(xhrio);
        }, this));

        xhrio.send(hedgehog.ghost.API_URI_BASE + 'posts/?' + goog.uri.utils.buildQueryDataFromMap(getData), 'GET');
    });
};


/**
 * Load post by slug.
 * @param {Function} callback
 * @param {string} postSlug
 */
hedgehog.ghost.loadPostBySlug = function(callback, postSlug) {

    hedgehog.ghost.loadTags().then(function(data) {
        var xhrio = new goog.net.XhrIo();

        goog.events.listen(xhrio, goog.net.EventType.COMPLETE, goog.bind(function(e) {
            var xhr = /** @type {goog.net.XhrIo} */ (e.target)
              , result = xhr.getResponseJson();

            goog.dispose(xhrio);

            if(result.hasOwnProperty('errors')) {
                var error = result['errors']['0'];
                switch (error['type']) {
                    case "NotFoundError":
                        window.location.replace('/notfound');
                        break;
                    default:
                        throw new Error(error['message'], error['type']);
                }
            } else {
                goog.object.extend(/** @type {Object|null} */(result), {'tags' : data['tags']});
                callback(result);
            }
        }, this));

        xhrio.send(hedgehog.ghost.API_URI_BASE + 'posts/' + postSlug + '/', 'GET');
    });
};

/**
 * Get settings.
 * @param callback
 */
hedgehog.ghost.loadSettings = function(callback) {
    var xhrio = new goog.net.XhrIo();

    goog.events.listen(xhrio, goog.net.EventType.COMPLETE, goog.bind(function(e) {
        var xhr = /** @type {goog.net.XhrIo} */ (e.target)
          , result = xhr.getResponseJson();

        goog.dispose(xhrio);

        callback({'settings' : result});
    }, this));

    xhrio.send(hedgehog.ghost.API_URI_BASE + 'settings/', 'GET');
};


/**
 * Get all tags.
 * @return {goog.Promise}
 */
hedgehog.ghost.loadTags = function() {
    return new goog.Promise(function(resolve, reject) {
        var xhrio = new goog.net.XhrIo();

        goog.events.listen(xhrio, goog.net.EventType.COMPLETE, goog.bind(function(e) {
            var xhr = /** @type {goog.net.XhrIo} */ (e.target)
              , result = xhr.getResponseJson();
            goog.dispose(xhrio);
            resolve(result);
        }, this));

        xhrio.send(hedgehog.ghost.API_URI_BASE + 'tags/', 'GET');
    });
};


