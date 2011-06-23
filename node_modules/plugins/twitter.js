var bot = require('bot.js'),
    twitter = require('twitter'),
    fs = require('fs'),
    twit = new twitter(JSON.parse(fs.readFileSync('twitter-keys')));

twit.stream('statuses/filter', {
    track: 'tihlde'
},
function(stream) {
    stream.on('data', function(data) {
        bot.client.say(bot.channel, '[twitter] ' + data.user.screen_name + ': ' + data.text);
    });
});

function onMessage(from, to, message) {
    if (message.match(/^!twitter /)) {
        twit.updateStatus(from + ': ' + message.replace(/^!twitter /, ''), function(data) {});
    }
}

bot.client.addListener('message', onMessage);
exports.destruct = function() {
    bot.client.removeListener('message', onMessage);
};

