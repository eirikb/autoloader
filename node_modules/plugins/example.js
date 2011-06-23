// This is a simple example to show how to write plugins

var bot = require('bot.js');

function onMessage(from, to, message) {
    if (message.match(/abcdtest/)) {
        bot.client.say(bot.channel, 'Like a boss');
    }
}

bot.client.addListener('message', onMessage);

exports.destruct = function() {
    bot.client.removeListener('message', onMessage);
};

