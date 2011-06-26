var fs = require('fs'),
irc = require("irc"),
listeners = {},
triggers = [],
self = this;

require('plugins.js').watch();

exports.triggers = triggers;

var client = exports.client = new irc.Client('irc.efnet.org', 'hilde', {
    userName: 'tihihilde',
    realName: 'tihihilde',
    channels: ['#tihlde']
});

exports.addListener = function(obj, type, fn) {
    client.addListener(type, fn);
    if (!listeners[obj]) {
        listeners[obj] = [];
    }
    listeners[obj].push({
        type: type,
        fn: fn
    });
};

exports.removeListeners = function(obj) {
    listeners[obj].forEach(function(l) {
        client.removeListener(l.type, l.fn);
    });
};

exports.onTrigger = function(obj, name, triggerKeys, callback) { //
    triggerKeys = [].concat(triggerKeys).filter(function(tk) { 
        return tk !== undefined;
    });
    triggers.push({
        name: name,
        triggerKeys: triggerKeys
    });
    triggerKeys.forEach(function(triggerKey) {
        self.addListener(obj, 'message', function(from, to, msg) {
            // TODO: Fix with pure regexp
            var regexp = new RegExp('^!' + triggerKey + (msg.indexOf(' ') > 0 ? ' ': ''));
            if (msg.match(regexp)) {
                try {
                    callback(from, to, msg.replace(regexp, ''));
                } catch(e) {
                    console.log('Trigger error for %s:', triggerKey, e);
                }
            }
        });
    });
};

