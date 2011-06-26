var bot = require('bot.js');

bot.onTrigger(this, 'Triggerlist', ['h', 'help', 'triggers'], function(from, to, msg) {
    bot.client.say(to, bot.triggers.map(function(t) { 
        return t.name + ': ' + t.triggerKeys.join(' ');
    }).join(' - '));
});

