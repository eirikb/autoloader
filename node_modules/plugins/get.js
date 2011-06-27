var http = require('http'),
path = require('path');

exports.get = function(url, callback) {
    var data = '';
    url = url.split('/');
    http.get({
        host: url[0],
        path: path.join('/', url.slice(1).join('/'))
    },
    function(res) {
        res.on('data', function(c) {
            data += c;
        });
        res.on('end', function() {
            callback(data);
        });
    });
};

