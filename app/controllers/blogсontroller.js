goog.provide('hedgehog.controllers.BlogController');

goog.require('hedgehog.core.Controller');
goog.require('goog.net.XhrIo');

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

    var url = '/ghost/api/v0.1/authentication/token';
    var postData = 'grant_type=password&username=banguit@gmail.com&password=Fynjirf;;tn&client_id=ghost-admin';

    var callback = function(e) {
        var xhr = /** @type {goog.net.XhrIo} */ (e.target);
        console.log(xhr.getResponseJson());
        if (xhr.isSuccess()) {
            // Success! The response code was 200, 204, or 304.
        } else if (xhr.getLastErrorCode() == goog.net.ErrorCode.ABORT) {
            // abort() called.
        } else if (xhr.getLastErrorCode() == goog.net.ErrorCode.TIMEOUT) {
            // Timeout exceeded.
        } else {
            // Some other error occurred. Inspecting the value of xhr.getStatus() is
            // a good place to start to determine the source of the error. }
        }
    };
    goog.net.XhrIo.send(url, callback, 'POST', postData);

    response.render(hedgehog.templates.blog, {}, goog.dom.getElement('content'));
};