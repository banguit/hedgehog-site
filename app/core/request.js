goog.provide('hedgehog.core.Request');

goog.require('goog.Uri');


/**
 * Create a simple request object based on the provided URL.
 *
 * @param {*=} opt_uri The uri we are constructing this object from.
 * @param {boolean=} opt_ignoreCase Whether or not we are performing a case
 * sensitive parse.
 *
 * @constructor
 * @extends {goog.Uri}
 */
hedgehog.core.Request = function(opt_uri, opt_ignoreCase) {
    goog.Uri.call(this, opt_uri, opt_ignoreCase);
};
goog.inherits(hedgehog.core.Request, goog.Uri);


/**
 * Convert this object to a simple JSON object.
 *
 * @return {Object}
 */
hedgehog.core.Request.prototype.toJSON = function() {
    var obj = {
        domain: this.getDomain(),
        path: this.getPath(),
        port: this.getPort(),
        query: this.getQuery(),
        scheme: this.getScheme(),
        userInfo: this.getUserInfo(),
        queryData: {}
    };

    var queryData = this.getQueryData(),
        keys = queryData.getKeys();

    for (var a = 0; a < keys.length; a++) {
        var values = queryData.getValues(keys[a]);

        if (values.length > 1) {
            obj.queryData[keys[a]] = values;
        } else {
            obj.queryData[keys[a]] = queryData.get(keys[a]);
        }
    }

    return obj;
};
