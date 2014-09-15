/**
 * @fileoverview This component used to access ghost public JSON API
 * @author banguit@gmail.com (Dmitry Antonenko)
 */

goog.provide('hedgehog.ghost');
goog.provide('hedgehog.ghost.GhostSession');

goog.require('hedgehog.XhrIo');

/**
 * Get posts
 */
hedgehog.ghost.getPosts = function() {
    var session = hedgehog.ghost.GhostSession.getInstance();

    return session.getToken();
};


/**
 * @constructor
 */
hedgehog.ghost.GhostSession = function () {

    /**
     * @type {string}
     * @private
     */
    this.authenticationUrl_ = '/ghost/api/v0.1/authentication/token';

    /**
     * @type {string}
     * @private
     */
    this.postData_ = 'grant_type=password&username=banguit@gmail.com&password=Fynjirf;;tn&client_id=ghost-admin';

    /**
     * @type {{access_token: string, refresh_token: string, expires_in: number, token_type: string}}
     * @private
     */
    this.token_;

    /**
     * @type {hedgehog.XhrIo}
     * @private
     */
    this.xhr_ = new hedgehog.XhrIo(true);
    goog.events.listen(this.xhr_, goog.net.EventType.SUCCESS, goog.bind(this.authenticationCallback_, this));
    this.xhr_.send(this.authenticationUrl_, 'POST', this.postData_);
};
goog.addSingletonGetter(hedgehog.ghost.GhostSession);


/**
 * @param e
 * @private
 */
hedgehog.ghost.GhostSession.prototype.authenticationCallback_ = function(e) {
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);
    this.token_ = /** @type {{access_token: string, refresh_token: string, expires_in: number, token_type: string}} */ (xhr.getResponseJson());
};


/**
 * @return {{access_token: string, refresh_token: string, expires_in: number, token_type: string}}
 */
hedgehog.ghost.GhostSession.prototype.getToken = function() {
    return this.token_;
};