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

Date.prototype.yyyymmdd = function() {

    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();

    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
};

window.history.goBack = function (e) {
    var defaultLocation = "#!/"
      , oldHash = window.location.hash
      , newHash;

    window.history.back(); // Try to go back

    newHash = window.location.hash;

    if(newHash === oldHash && (typeof(document.referrer) !== "string" || document.referrer  === "")) {
        window.setTimeout(function() {
            // redirect to default location
            window.location.href = defaultLocation;
        }, 500); // set timeout in ms
    }

    if(e) {
        if(e.preventDefault) { e.preventDefault() }
        if(e.preventPropagation) { e.preventPropagation() }
    }
};
goog.exportProperty(window.history, 'goBack', window.history.goBack);

goog.require('hedgehog');