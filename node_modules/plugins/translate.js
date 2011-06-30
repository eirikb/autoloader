var bot = require('bot.js'),
http = require('http');

var translate = exports.translate = function(from, to, text, callback) {
    var options = {
        host: 'translate.google.com',
        port: 80,
        path: '/translate_a/t?client=a&text=' + escape(text) + '&sl=' + from + '&tl=' + to,
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    };
    http.get(options, function(res) {
        res.on('data', function(data) {
            try {
                data = JSON.parse(data);
                callback(data.sentences[0].trans);
            } catch(e) {
                console.log('Unable to parse data for translate.js', e);
            }
        });
    });
};

bot.onTrigger(this, 'Translate', ['t', 'translate'], function(from, to, msg) {
    var words = msg.split(' ');
    if (words.length > 3) {
        msg = words.slice(2).join(' ');
        translate(words[0], words[1], msg, function(text) {
            bot.client.say(to, text);
        });
    }
});

