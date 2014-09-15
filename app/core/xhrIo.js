/**
 * @fileoverview Wrapper Class for Google Closure XhrIo Object.
 *
 * By default, all xhr requests are made asynchronously.  This wrapper provides the flexibility to defined the requests
 * synchronicity.  Most of the functionality in this class was left unchanged from the original function, but the
 * class allows for requests to be made synchronously.
 * @suppress {accessControls}
 * @author pitz (https://github.com/jpitz)
 */


goog.provide('hedgehog.XhrIo');

goog.require('goog.net.XhrIo');
goog.require('goog.Timer');
goog.require('goog.array');
goog.require('goog.debug.Logger');
goog.require('goog.debug.entryPointRegistry');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.json');
goog.require('goog.net.ErrorCode');
goog.require('goog.net.EventType');
goog.require('goog.net.HttpStatus');
goog.require('goog.net.XmlHttp');
goog.require('goog.object');
goog.require('goog.structs');
goog.require('goog.structs.Map');
goog.require('goog.uri.utils');



/**
 * Basic class for handling XMLHttpRequests.
 *
 * @param {boolean=} opt_async Whether or not to request the resource asynchronously
 * @param {goog.net.XmlHttpFactory=} opt_xmlHttpFactory Factory to use when creating XMLHttpRequest objects.
 * @constructor
 * @extends {goog.net.XhrIo}
 */
hedgehog.XhrIo = function(opt_async, opt_xmlHttpFactory) {
    goog.net.XhrIo.call(this, opt_xmlHttpFactory);

    /**
     * @type {boolean}
     * @private
     */
    this.async_ = !!opt_async;
};
goog.inherits(hedgehog.XhrIo, goog.net.XhrIo);

/**
 * @type {boolean}
 * @private
 */
hedgehog.XhrIo.prototype.async_ = true;


/**
 * @type {Array}
 * @private
 */
hedgehog.XhrIo.sendInstances_ = [];


/**
 *
 */
hedgehog.XhrIo.cleanup = function() {
    var instances = hedgehog.XhrIo.sendInstances_;
    while (instances.length) {
        instances.pop().dispose();
    }
};


/**
 * @param XhrIo
 * @private
 */
hedgehog.XhrIo.cleanupSend_ = function(XhrIo) {
    XhrIo.dispose();
    goog.array.remove(hedgehog.XhrIo.sendInstances_, XhrIo);
};


/**
 * Static send that creates a short lived instance of XhrIo to send the
 * request.
 * @see goog.net.XhrIo.cleanup
 * @param {string|goog.Uri} url Uri to make request to.
 * @param {boolean=} opt_async Whether or not the request should be made
 *     asynchronously.
 * @param {Function=} opt_callback Callback function for when request is
 *     complete.
 * @param {string=} opt_method Send method, default: GET.
 * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=}
 *     opt_content Body data.
 * @param {Object|goog.structs.Map=} opt_headers Map of headers to add to the
 *     request.
 * @param {number=} opt_timeoutInterval Number of milliseconds after which an
 *     incomplete request will be aborted; 0 means no timeout is set.
 * @param {boolean=} opt_withCredentials Whether to send credentials with the
 *     request. Default to false. See {@link goog.net.XhrIo#setWithCredentials}.
 * @return {!goog.net.XhrIo} The sent XhrIo.
 */
hedgehog.XhrIo.send = function(url, opt_async, opt_callback, opt_method, opt_content,
                               opt_headers, opt_timeoutInterval,
                               opt_withCredentials) {
    var x = new hedgehog.XhrIo(opt_async);
    goog.net.XhrIo.sendInstances_.push(x);
    if (opt_callback) {
        x.listen(goog.net.EventType.COMPLETE, opt_callback);
    }
    x.listenOnce(goog.net.EventType.READY, x.cleanupSend_);
    if (opt_timeoutInterval) {
        x.setTimeoutInterval(opt_timeoutInterval);
    }
    if (opt_withCredentials) {
        x.setWithCredentials(opt_withCredentials);
    }
    x.send(url, opt_method, opt_content, opt_headers);
    return x;
};


/**
 * @inheritDoc
 */
hedgehog.XhrIo.prototype.send = function(url, opt_method, opt_content, opt_headers) {
    if (this.xhr_) {
        throw Error('[goog.net.XhrIo] Object is active with another request=' +
            this.lastUri_ + '; newUri=' + url);
    }

    var method = opt_method ? opt_method.toUpperCase() : 'GET';

    this.lastUri_ = url;
    this.lastError_ = '';
    this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
    this.lastMethod_ = method;
    this.errorDispatched_ = false;
    this.active_ = true;

    // Use the factory to create the XHR object and options
    this.xhr_ = this.createXhr();
    this.xhrOptions_ = this.xmlHttpFactory_ ?
        this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();

    // Set up the onreadystatechange callback
    this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);

    /**
     * Try to open the XMLHttpRequest (always async), if an error occurs here it
     * is generally permission denied
     * @preserveTry
     */
    try {
        goog.log.fine(this.logger_, this.formatMsg_('Opening Xhr'));
        this.inOpen_ = true;
        this.xhr_.open(method, String(url), this.async_);  // Always async!
        this.inOpen_ = false;
    } catch (err) {
        goog.log.fine(this.logger_,
            this.formatMsg_('Error opening Xhr: ' + err.message));
        this.error_(goog.net.ErrorCode.EXCEPTION, err);
        return;
    }

    // We can't use null since this won't allow requests with form data to have a
    // content length specified which will cause some proxies to return a 411
    // error.
    var content = opt_content || '';

    var headers = this.headers.clone();

    // Add headers specific to this request
    if (opt_headers) {
        goog.structs.forEach(opt_headers, function(value, key) {
            headers.set(key, value);
        });
    }

    // Find whether a content type header is set, ignoring case.
    // HTTP header names are case-insensitive.  See:
    // http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2
    var contentTypeKey = goog.array.find(headers.getKeys(),
        goog.net.XhrIo.isContentTypeHeader_);

    var contentIsFormData = (goog.global['FormData'] &&
        (content instanceof goog.global['FormData']));
    if (goog.array.contains(goog.net.XhrIo.METHODS_WITH_FORM_DATA, method) &&
        !contentTypeKey && !contentIsFormData) {
        // For requests typically with form data, default to the url-encoded form
        // content type unless this is a FormData request.  For FormData,
        // the browser will automatically add a multipart/form-data content type
        // with an appropriate multipart boundary.
        headers.set(goog.net.XhrIo.CONTENT_TYPE_HEADER,
            goog.net.XhrIo.FORM_CONTENT_TYPE);
    }

    // Add the headers to the Xhr object
    headers.forEach(function(value, key) {
        this.xhr_.setRequestHeader(key, value);
    }, this);

    if (this.responseType_) {
        this.xhr_.responseType = this.responseType_;
    }

    /**
     * Try to send the request, or other wise report an error (404 not found).
     * @preserveTry
     */
    try {
        this.cleanUpTimeoutTimer_(); // Paranoid, should never be running.
        if (this.timeoutInterval_ > 0) {
            this.useXhr2Timeout_ = goog.net.XhrIo.shouldUseXhr2Timeout_(this.xhr_);
            goog.log.fine(this.logger_, this.formatMsg_('Will abort after ' +
                this.timeoutInterval_ + 'ms if incomplete, xhr2 ' +
                this.useXhr2Timeout_));
            if (this.useXhr2Timeout_) {
                this.xhr_[goog.net.XhrIo.XHR2_TIMEOUT_] = this.timeoutInterval_;
                this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] =
                    goog.bind(this.timeout_, this);
            } else {
                this.timeoutId_ = goog.Timer.callOnce(this.timeout_,
                    this.timeoutInterval_, this);
            }
        }
        goog.log.fine(this.logger_, this.formatMsg_('Sending request'));
        this.inSend_ = true;
        this.xhr_.send(content);
        this.inSend_ = false;

    } catch (err) {
        goog.log.fine(this.logger_, this.formatMsg_('Send error: ' + err.message));
        this.error_(goog.net.ErrorCode.EXCEPTION, err);
    }
};
