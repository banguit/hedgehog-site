goog.provide('hedgehog.controllers.BlogController');

goog.require('hedgehog.core.Controller');
goog.require('hedgehog.ghost');
goog.require('hedgehog.Showdown');
goog.require('hedgehog.Share');


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

    var isFirstLoad = request.getRouteData('isFirstLoad');

    if(!isFirstLoad) {
        var postsPerPage = hedgehog.core.Application.BlogSettings.postsPerPage;

        hedgehog.ghost.loadPosts(goog.bind(function(data) {

            var converter = new hedgehog.Showdown.converter();
            goog.array.forEach(data['posts'], function(post) {
                post['pretty_date'] = this.prettyDate_(post['created_at']);
                post['datetime'] = new Date(post['created_at']).yyyymmdd();
                post['html_preview'] = converter.makeHtml(post['markdown'].split(" ").splice(0, 100).join(" ") + "...");
            }, this);

            response.render(hedgehog.templates.blog, data, goog.dom.getElement('content'));

            // In case we are navigated back to the page without hash
            if(window.location.pathname.length > 1) {
                this.pushStateForLinks_(response);
            }

            resolve();
        }, this), parseInt(request.getRouteData('page'), 10), postsPerPage);
    } else {

        this.pushStateForLinks_(response);
        resolve();
    }
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

    var isFirstLoad = request.getRouteData('isFirstLoad')
      , fragment = request.getFragment();

    if(!goog.string.isEmpty(fragment) || (goog.string.isEmpty(fragment) && !isFirstLoad)) {
        hedgehog.ghost.loadPostBySlug(goog.bind(function(data) {
            var post = data['posts'][0]
              , contentEl = goog.dom.getElement('content');

            post['pretty_date'] = this.prettyDate_(post['created_at']);
            post['datetime'] = new Date(post['created_at']).yyyymmdd();

            response.render(hedgehog.templates.post, post, contentEl);

            // Update title
            var meta_title = post['meta_title'];
            document.title = (goog.isDefAndNotNull(meta_title) ? meta_title : post['title']) + ' | ' + document.title;

            // Update meta title
            var title = document.querySelector('meta[name="title"]');
            title.content = document.title;

            // Update meta descritpion
            var description = document.querySelector('meta[name="description"]');
            description.content = post['meta_description'] || '';

            // Initialize DISQUS
            this.initializeDisqusForPost_(post['slug'], post['title']);

            // In case we are navigated back to the page without hash
            if(window.location.pathname.length > 1) {
                this.pushStateForLinks_(response);
            }

            // Add back link handler.
            this.addPostBackLinkHandler_(response);

            // Render share buttons
            this.renderShareButtons_();

            resolve();
        }, this), /** @type {string} */(request.getRouteData('slug')));

    } else {
        var pathName = window.location.pathname
          , path = pathName.substr(0, pathName.length - 1)
          , slug = path.substr(path.lastIndexOf('/') + 1);

        this.pushStateForLinks_(response);

        // Update page title
        var h1 = document.querySelector('header.photo h1.container').textContent
          , title = document.querySelector('meta[name="title"]');
        document.title = h1 + ' | ' + document.title;
        title.content = document.title;

        // Add back link handler.
        this.addPostBackLinkHandler_(response);

        // Initialize DISQUS
        this.initializeDisqusForPost_(slug, document.title);

        // Render share buttons
        this.renderShareButtons_(true);

        resolve();
    }
};


/*
 * - - - - - - - - *
 * Private methods *
 * - - - - - - - - *
 */

/**
 * @param {boolean=} opt_skipGPLus
 * @private
 */
hedgehog.controllers.BlogController.prototype.renderShareButtons_ = function(opt_skipGPLus) {
    var shareContainer = goog.dom.getElementByClass('share')
      , shareComponent = new hedgehog.Share();

    shareComponent.render(shareContainer);
};


/**
 * Add back link handler
 * @param {hedgehog.core.Response} response
 * @private
 */
hedgehog.controllers.BlogController.prototype.addPostBackLinkHandler_ = function(response) {
    var backLink = document.querySelector('.post-header .back-link');
    goog.events.listen(backLink, goog.events.EventType.CLICK, goog.partial(this.goBackLinkHandler_, response));
};


/**
 * Initialize DISQUS for post.
 * @param {string} slug
 * @param {string} post_title
 * @private
 */
hedgehog.controllers.BlogController.prototype.initializeDisqusForPost_ = function(slug, post_title) {
    // Initialize DISQUS
    window['disqus_shortname'] = 'hedgehogcomua';
    window['disqus_identifier'] = '/blog/post/' + slug; // a unique identifier for each page where Disqus is present
    window['disqus_title'] = 'Blog | ' + post_title; // a unique title for each page where Disqus is present
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
};


/**
 * Correct link navigation in case if we are located not on the root of site
 * @param {hedgehog.core.Response} response
 * @private
 */
hedgehog.controllers.BlogController.prototype.pushStateForLinks_ = function(response) {
    var titles = document.querySelectorAll('.post-title a, a.read-more, .pager a')
        , headerLinks = document.querySelectorAll('.wrapper > header ul.nav a')
        , listenersKeys = [];

    goog.array.forEach(titles, function(anchor) {
        var href = anchor.getAttribute("href");
        if(!goog.string.contains(href, '#!')) {
            anchor.setAttribute("href", '/#!' + anchor.getAttribute("href"));
        }

        if(href.indexOf('/') != 0) {
            anchor.setAttribute("href", '/' + anchor.getAttribute("href"));
        }

        listenersKeys.push(
            goog.events.listenOnce(anchor, goog.events.EventType.CLICK, goog.partial(this.pushStateLinkHandler_, anchor, response, listenersKeys))
        );
    }, this);

    // Correct links for SPA navigation
    goog.array.forEach(headerLinks, function(anchor) {
        listenersKeys.push(
            goog.events.listenOnce(anchor, goog.events.EventType.CLICK, goog.partial(this.pushStateLinkHandler_, anchor, response, listenersKeys))
        );
    }, this);
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
 * @param anchor
 * @param response
 * @param listenersKeys
 * @param e
 * @private
 */
hedgehog.controllers.BlogController.prototype.pushStateLinkHandler_ = function(anchor, response, listenersKeys, e) {
    if (window.history && window.history.pushState) {
        window.history.pushState(null, document.title, anchor.href);
        response.getRouter().checkRoutes();
    }

    goog.array.forEach(listenersKeys, function(key) {
        goog.events.unlistenByKey(key);
    });
};


/**
 * @param {hedgehog.core.Response} response
 * @param e
 * @private
 */
hedgehog.controllers.BlogController.prototype.goBackLinkHandler_ = function (response, e) {
    var defaultLocation = "/#!/";

    if (window.history && window.history.pushState) {
        window.history.pushState(null, document.title, defaultLocation);
        response.getRouter().checkRoutes();
    } else {
        var oldHash = window.location.hash
          , newHash;

        window.history.back(); // Try to go back

        newHash = window.location.hash;

        if(newHash === oldHash && (typeof(document.referrer) !== "string" || document.referrer  === "")) {
            window.setTimeout(function() {
                // redirect to default location
                window.location.href = defaultLocation;
            }, 500); // set timeout in ms
        }
    }

    if(e) {
        if(e.preventDefault) { e.preventDefault() }
        if(e.preventPropagation) { e.preventPropagation() }
    }
};


/**
 * Takes an ISO time and returns a string representing how long ago the date represents.
 * @param time
 * @return {string}
 * @private
 */
hedgehog.controllers.BlogController.prototype.prettyDate_ = function(time){
    var months = ['January', 'February',
                   'March', 'April',
                   'May', 'June',
                   'July','August',
                   'September', 'October',
                   'November', 'December'];

    var date = new Date(time);
    var curr_date = date.getDate();
    var curr_month = date.getMonth();
    var curr_year = date.getFullYear();
    return curr_date + ' ' + months[curr_month] + ' ' + curr_year;
};

goog.exportProperty(hedgehog.controllers.BlogController.prototype, 'post', hedgehog.controllers.BlogController.prototype.post);
