if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        /**
         * @constructor
         */
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}

goog.require('hedgehog');