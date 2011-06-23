var bot = require('bot.js'),
t = require('translate.js'),
g = require('get.js');

function onMessage(from, to, message) {
    if (message.match(/^meh /)) {
        try {
            message = message.replace(/^meh /, '');
            var e = eval(message);
            if (typeof e !== 'undefined') {
                bot.say(e);
            }
        } catch(err) {
            console.log(err);
        }
    }
}

bot.client.addListener('message', onMessage);

exports.destruct = function() {
    bot.client.removeListener('message', onMessage);
};

