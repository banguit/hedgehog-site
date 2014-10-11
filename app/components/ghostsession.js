goog.provide('hedgehog.ghost.GhostSession');

goog.require('hedgehog.ghost');

/**
 * @constructor
 */
hedgehog.ghost.GhostSession = function () {

    /**
     * @type {string}
     * @private
     */
    this.authenticationUrl_ = hedgehog.ghost.API_URI_BASE + 'authentication/token';

    /**
     * @type {{grant_type: string, username: string, password: string, client_id: string}}
     * @private
     */
    this.postDataObject_ = {
        'grant_type': "password",
        'username': "[email@email.com]",
        'password': "[password_here]",
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
        resolve({'token' : this.token_});
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

            resolve({'token' : this.token_});
            goog.dispose(xhrio);
        }, this));
        xhrio.send(this.authenticationUrl_, 'POST', this.postData_);
    }, this);
};