/**
 * @fileoverview This component used to access ghost public JSON API
 * @author banguit@gmail.com (Dmitry Antonenko)
 */

goog.provide('hedgehog.ghost');
goog.provide('hedgehog.ghost.GhostSession');

goog.require('goog.net.XhrIo');
goog.require('goog.Promise');
goog.require('goog.string.format');
goog.require('goog.uri.utils');


/**
 * @const
 * @type {string}
 */
hedgehog.ghost.URI_BASE = '/ghost/api/v0.1/';

/**
 * Get all posts
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
    opt_page = goog.isDefAndNotNull(opt_page) ? opt_page : 1;
    opt_limit = goog.isDefAndNotNull(opt_limit) ? opt_limit : 10;
    opt_status = goog.isDefAndNotNull(opt_status) ? opt_status : 'published';
    var session = hedgehog.ghost.GhostSession.getInstance()
      , getData = {
            'page': opt_page,
            'limit': opt_limit,
            'status': opt_status
        };

    session.getToken().then(hedgehog.ghost.loadTags).then(function(data) {
        var xhrio = new goog.net.XhrIo();
        goog.events.listen(xhrio, goog.net.EventType.COMPLETE, goog.bind(function(e) {
            var xhr = /** @type {goog.net.XhrIo} */ (e.target)
              , result = xhr.getResponseJson();

            goog.object.extend(/** @type {Object|null} */(result), {'tags' : data['tags']});
            callback(result);

            goog.dispose(xhrio);
        }, this));
        xhrio.headers.set('Authorization', data['token']['token_type'] + ' ' + data['token']['access_token']);
        xhrio.send(hedgehog.ghost.URI_BASE + 'posts/?' + goog.uri.utils.buildQueryDataFromMap(getData), 'GET');
    });
};


/**
 * Get all tags
 * @param token
 * @return {goog.Promise}
 */
hedgehog.ghost.loadTags = function(token) {
    return new goog.Promise(function(resolve, reject) {
        var xhrio = new goog.net.XhrIo();

        goog.events.listen(xhrio, goog.net.EventType.COMPLETE, goog.bind(function(e) {
            var xhr = /** @type {goog.net.XhrIo} */ (e.target)
              , result = xhr.getResponseJson();
            goog.dispose(xhrio);
            goog.object.extend(/** @type {Object|null} */(result), {'token' : token});
            resolve(result);
        }, this));

        xhrio.headers.set('Authorization', token['token_type'] + ' ' + token['access_token']);
        xhrio.send(hedgehog.ghost.URI_BASE + 'tags/', 'GET');
    });
};


/**
 * @constructor
 */
hedgehog.ghost.GhostSession = function () {

    /**
     * @type {string}
     * @private
     */
    this.authenticationUrl_ = hedgehog.ghost.URI_BASE + 'authentication/token';

    /**
     * @type {{grant_type: string, username: string, password: string, client_id: string}}
     * @private
     */
    this.postDataObject_ = {
        'grant_type': "password",
        'username': "banguit@gmail.com",
        'password': "QAZwsx123",
        'client_id': "ghost-admin"
    };

    /**
     * @type {string}
     * @private
     */
    this.postData_ = goog.uri.utils.buildQueryDataFromMap(this.postDataObject_);

    /**
     * @type {{access_token: string, refresh_token: string, expires_in: number, token_type: string}}
     * @private
     */
    this.token_;

    /**
     * @type {Date}
     * @private
     */
    this.accessTokenExpirationTime_;
};
goog.addSingletonGetter(hedgehog.ghost.GhostSession);


/**
 * @return {!goog.Promise.<!{access_token: string, refresh_token: string, expires_in: number, token_type: string}>} A Promise that will be resolved with the given token if the authentication passed successfully.
 */
hedgehog.ghost.GhostSession.prototype.getToken = function() {
    if(!goog.isDefAndNotNull(this.token_) || this.accessTokenExpirationTime_ < new Date()) {
        return this.requestToken_();
    }

    return new goog.Promise(function(resolve, reject) {
        resolve(this.token_);
    }, this);
};


/**
 * @return {!goog.Promise.<!{access_token: string, refresh_token: string, expires_in: number, token_type: string}>} A Promise that will be resolved with the given token if the authentication passed successfully.
 */
hedgehog.ghost.GhostSession.prototype.requestToken_ = function() {
    return new goog.Promise(function(resolve, reject) {
        var xhrio = new goog.net.XhrIo();
        goog.events.listen(xhrio, goog.net.EventType.COMPLETE, goog.bind(function(e) {
            var xhr = /** @type {goog.net.XhrIo} */ (e.target);
            this.token_ = /** @type {{access_token: string, refresh_token: string, expires_in: number, token_type: string}} */ (xhr.getResponseJson());

            var t = new Date();
            t.setSeconds(t.getSeconds() + this.token_['expires_in']);
            this.accessTokenExpirationTime_ = t;

            resolve(this.token_);
            goog.dispose(xhrio);
        }, this));
        xhrio.send(this.authenticationUrl_, 'POST', this.postData_);
    }, this);
};