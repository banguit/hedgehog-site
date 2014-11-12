goog.provide('hedgehog.Share');

goog.require('goog.ui.Component');
goog.require('goog.dom');

/**
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Component}
 */
hedgehog.Share = function(opt_domHelper) {
    goog.ui.Component.call(this, opt_domHelper);

};
goog.inherits(hedgehog.Share, goog.ui.Component);


/** @inheritDoc */
hedgehog.Share.prototype.createDom = function() {
    var container = goog.dom.createDom('div')
      , facebook = goog.dom.createDom('a', { 'href': 'javascript:void(0)', 'class' : 'facebook' }, goog.dom.createDom('i', 'fa fa-facebook'))
      , googleplus = goog.dom.createDom('a', { 'href': 'javascript:void(0)', 'class' : 'googleplus' }, goog.dom.createDom('i', 'fa fa-google-plus'))
      , twitter = goog.dom.createDom('a', { 'href': 'javascript:void(0)', 'class' : 'twitter' }, goog.dom.createDom('i', 'fa fa-twitter'));

    goog.events.listen(facebook, goog.events.EventType.CLICK, this.facebookShareHandler_, false, this);
    goog.events.listen(googleplus, goog.events.EventType.CLICK, this.googleplusShareHandler_, false, this);
    goog.events.listen(twitter, goog.events.EventType.CLICK, this.twitterShareHandler_, false, this);

    container.appendChild(facebook);
    container.appendChild(googleplus);
    container.appendChild(twitter);

    this.setElementInternal(container);
};


/** @inheritDoc */
hedgehog.Share.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
};


/**
 * @private
 */
hedgehog.Share.prototype.facebookShareHandler_ = function() {
    var url = 'http://www.facebook.com/sharer.php?s=100&app_id=354317658069297&display=popup';
    url += '&p[title]=' + encodeURIComponent(document.title);
    url += '&p[url]='   + encodeURIComponent(window.location.href.replace('/#!',''));

    this.openPopup_(url);
};


/**
 * @private
 */
hedgehog.Share.prototype.googleplusShareHandler_ = function() {
    var url  = 'https://plus.google.com/share?';
    url += 'url=' + encodeURIComponent(window.location.href.replace('/#!',''));

    this.openPopup_(url);
};


/**
 * @private
 */
hedgehog.Share.prototype.twitterShareHandler_ = function() {
    var url  = 'https://twitter.com/share?';
    url += 'url=' + encodeURIComponent(window.location.href.replace('/#!',''));
    url += '&text=' + encodeURIComponent(document.title);

    this.openPopup_(url);
};


/**
 * @private
 */
hedgehog.Share.prototype.openPopup_  = function(url) {
    window.open(url, '', 'toolbar=0,status=0,width=526,height=436');
};