var bot = require('bot.js'),
t = require('plugins/translate.js'),
g = require('plugins/get.js'),
$ = require('jquery'),
_ = require('underscore');

var currentTo, say = function(msg) {
    bot.client.say(currentTo, msg);
},
s = say;

bot.onTrigger(this, 'Godmode', ['e', 'meh', 'god'], function(from, to, msg) {
    try {
        console.log('%s is trying to run %s...', from, msg);
        currentTo = to;
        var e = eval(msg);
        if (typeof e !== 'undefined') {
            bot.client.say(to, e);
        }
    } catch(err) {
        console.log(err);
    }
});

