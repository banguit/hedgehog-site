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
 * @param {Function} resolve
 * @param {Function} reject
 */
hedgehog.controllers.BlogController.prototype.index = function(request, response, resolve, reject) {

    hedgehog.ghost.loadPosts(goog.bind(function(data) {
        var converter = new hedgehog.Showdown.converter();
        goog.array.forEach(data['posts'], function(post) {
            post['pretty_date'] = this.prettyDate_(post['created_at']);
            post['datetime'] = new Date(post['created_at']).yyyymmdd();
            post['html_preview'] = converter.makeHtml(post['markdown'].split(" ").splice(0, 100).join(" ") + "...");

            // Get tags information
            var tagsIds = post['tags'];
            post['tags'] = goog.array.filter(data['tags'], function(tag) {
                return goog.array.contains(tagsIds, tag.id);
            });
        }, this);

        response.render(hedgehog.templates.blog, data, goog.dom.getElement('content'));
        resolve();
    }, this), parseInt(request.getRouteData('page'), 10));
};


/**
 * @param {hedgehog.core.Request} request
 * @param {hedgehog.core.Response} response
 * @param {Function} resolve
 * @param {Function} reject
 */
hedgehog.controllers.BlogController.prototype.post = function(request, response, resolve, reject) {
    // Scroll top
    window.scrollTo(0, 0);

    hedgehog.ghost.loadPostBySlug(goog.bind(function(data) {
        var post = data['posts'][0];

        post['pretty_date'] = this.prettyDate_(post['created_at']);
        post['datetime'] = new Date(post['created_at']).yyyymmdd();

        // Get tags information
        var tagsIds = post['tags'];
        post['tags'] = goog.array.filter(data['tags'], function(tag) {
            return goog.array.contains(tagsIds, tag.id);
        });

        response.render(hedgehog.templates.post, post, goog.dom.getElement('content'));

        // Update title
        document.title = post['title'] + ' | ' + document.title;

        // Initialize DISQUS
        window['disqus_shortname'] = 'hedgehogcomua';
        window['disqus_identifier'] = '/blog/post/' + post['slug']; // a unique identifier for each page where Disqus is present
        window['disqus_title'] = 'Blog | ' + post['title']; // a unique title for each page where Disqus is present
        window['disqus_url'] = window.location.href; // a unique URL for each page where Disqus is present

        if(!window.hasOwnProperty('DISQUS')) {
            var url = '//' + window['disqus_shortname'] + '.disqus.com/embed.js'
                , script = goog.dom.createDom('script', {'type': 'text/javascript', 'async' : 'true', 'src': url});

            document.body.appendChild(script);

            var reloadDisqus = goog.bind(function() {
                                   if(window.hasOwnProperty('DISQUS')) {
                                       this.reloadDisqus_();
                                   } else {
                                       setTimeout(reloadDisqus, 50);
                                   }
                               }, this);
            setTimeout(reloadDisqus, 50);
        } else {
            this.reloadDisqus_();
        }

        resolve();
    }, this), /** @type {string} */(request.getRouteData('slug')));
};

/**
 * Reload DISQUS comments.
 * @private
 */
hedgehog.controllers.BlogController.prototype.reloadDisqus_ = function() {
    window['DISQUS'].reset({
        'reload': true,
        'config': function () {
            this['page.title'] = window['disqus_title'];
            this['page.identifier'] = window['disqus_identifier'];
            this['page.url'] = window['disqus_url'];
        }
    });
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
};

goog.exportProperty(hedgehog.controllers.BlogController.prototype, 'post', hedgehog.controllers.BlogController.prototype.post);
