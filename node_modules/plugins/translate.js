var bot = require('bot.js'),
translate = require('translate.js');

function onMessage(from, to, message) {
    if (message.match(/^t /)) {
        message = message.replace(/^t /, '');
        var words = message.replace(/^t /, '').split(' ');
        if (words.length > 3) {
            message = words.slice(2).join(' ');
            translate.translate(words[0], words[1], message, function(text) {
                bot.say(text);
            });
        }
    }
}

bot.client.addListener('message', onMessage);

exports.destruct = function() {
    bot.client.removeListener('message', onMessage);
};

