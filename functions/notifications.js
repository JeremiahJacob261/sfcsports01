/** 
 * @author Ratan Phayade
 * @class
 * Manages the browser notification on all the browser.
 * supports: Chrome, Firefox and safari (Mobile and desktop version)
 */

var NotificationManager = (function(){

    /**
     * @private 
     * Holds all the valid event list
     */
    var actionEvents = [
        'onclick',
        'onshow',
        'onerror',
        'onclose'
    ];

    /**
     * Initialize the new instance of NotificationManager
     * @constructs NotificationManager
     * @param {string} title 
     * @param {string} icon 
     */
    function NotificationManager(title, icon){
        this.title = title;
        this.icon = icon;
        this.timeout = 5000;
        this.silent = true;
        this.lang = 'eng';
        this.init();
    };

    /**
     * Checks the browser support for Notificaiton
     * Also checks for the permission and prompts
     * @name NotificationManager#init
     * @function
     */
    this.init = function () {
        if(this.isBrowserSupported)
            if(this.hasPermission !== "granted")
                this.requestPermission();               
    };

    /**
     * Create or alters the property of the object
     * @name NotificationManager#setProperty
     * @function
     */
    this.setProperty = function(property, value) {
        this[property] = value;
        return this;
    };

    /**
     * clears particular property of the object
     * @name NotificationManager#clearProperty
     * @function
     */
    this.deleteProperty = function(property) {
        this[property] = null;
        return this;
    };

    /**
     * Sets the timeout value in mili sec
     * @name NotificationManager#setTimeout
     * @function
     */
    this.setTimeout = function(timeout) {
        this.timeout = timeout;
        return this;
    };

    /**
     * Sets the icon image for the notification
     * @name NotificationManager#setIcon
     * @function
     */
    this.setIcon = function(iconUrl) {
        this.icon = iconUrl;
        return this;
    };

    /**
     * Sets data property of notification
     * @name NotificationManager#setData
     * @function
     */
    this.setData = function(data) {
        this.data = data;
        return this;
    };

    /**
     * Sets title property of notification.
     * which will be displayed on notification
     * @name NotificationManager#setTitle
     * @function
     */
    this.setTitle = function(title) {
        this.title = title;
        return this;
    };

    /**
     * Sets language property of notification
     * @name NotificationManager#setLang
     * @function
     */
    this.setLang = function(lang){
        this.lang = lang;
        return this;
    };

    /**
     * Sets the silent property of notificaiton
     * Based on the value and browser compatability
     * @name NotificationManager#needSound
     * @function
     */
    this.needSound = function(value) {
        this.silent = !value;
        return this;
    };

    /**
     * Adds listener to the event occuring on notification.
     * Valid events : ['onclick', 'onshow', 'onclose', 'onerror']
     * @name NotificationManager#addListener
     * @function
     */
    this.addListener = function(event, callback){
        this[event] = callback;
        return this;
    };

    /**
     * clears all event listener.
     * @name NotificationManager#resetListeners
     * @function
     */
    this.resetListeners = function(){
        actionEvents.forEach(function(element){
            delete this[element];
        });
        return this;
    };

    /**
     * Removes listener to the event occuring on notification.
     * Valid events : ['onclick', 'onshow', 'onclose', 'onerror']
     * @name NotificationManager#deleteListener
     * @function
     */
    this.deleteListener = function(event){
        delete this[event];
        return this;
    };

    /**
     * Gives the browser compatability status
     * @name NotificationManager#isBrowserSupported
     * @function
     */    
    this.isBrowserSupported = function() {
        return (!!(window.Notification          // W3C Specification
                  || win.webkitNotifications    // old WebKit Browsers 
                  || navigator.mozNotification  // Firefox for Android and Firefox OS 
                  )
               );
    }();

    /**
     * Initializes the notifier instance
     * @name NotificationManager#initiateNotifier
     * @function
     */    
    this.initiateNotifier = function()  {
        this.notifire = (window.Notification            // W3C Specification
                        || win.webkitNotifications      // old WebKit Browsers 
                        || navigator.mozNotification    // Firefox for Android and Firefox OS 
                        );
       return this.notifire;
    }();

    /**
     * Gives the current browser premission for site
     * @name NotificationManager#hasPermission
     * @function
     */
    this.hasPermission =  function(){
        return this.notifire.permission;
    }();

    /**
     * Requests the browser for notification permission for the current site.
     * (If browser has notification support)
     * @name NotificationManager#requestPermission
     * @function
     */
    this.requestPermission = function() {
        return this.notifire.requestPermission();
    };

    /**
     * Binds all the listener Event to the notification
     * @name NotificationManager#bindEvents
     * @function
     */
    this.bindEvents = function(notification){
        actionEvents.forEach(function(element) {            
            delete notification[element];
            if(this.hasOwnProperty(element)){
                notification[element] = this[element];
            }            
        }, this);
        return notification;
    };

    /**
     * Sets the property of notificaiton and triggers a notification
     * @name NotificationManager#notify
     * @function
     */
    this.notify = function(message) {
        try {
            var n = new Notification(
                this.title,
                {
                    body: message,
                    icon: this.icon,
                    lang: this.lang                    
                }
            );
            this.bindEvents(n);
            setTimeout(
                n.close.bind(n), 
                this.timeout
            );
        } catch (err){
            console.log(err.message);
        }
    };
 });