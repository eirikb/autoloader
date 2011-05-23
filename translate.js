var http = require('http'),
Iconv = require('iconv').Iconv,
iconv = new Iconv('ISO-8859-1', 'UTF-8');

exports.translate = function(from, to, text, callback) {
	var options = {
		host: 'translate.google.com',
		port: 80,
		path: '/translate_a/t?client=a&text=' + escape(text) + '&sl=' + from + '&tl=' + to
	};
	http.get(options, function(res) {
		res.on('data', function(data) {
			data = JSON.parse(iconv.convert(data));
			callback(data.sentences[0].trans);
		});
	});
};

