var fs = require('fs'),
path = require('path'),
files = {};

function req(file, callback) {
    var module;
    try {
        module = require(file);
        files[file] = module;
        callback && callback(null, file, module);
    } catch(e) {
        callback && callback(e);
    }
}

exports.watch = function(directory, callback) {
    directory = path.resolve(directory);

    fs.readdir(directory, function(err, files) {
        files.forEach(function(file) {
            if (file.match(/^(?!\.).+\.js$/)) {
                file = path.join(directory, file);
                req(file, callback);

                fs.watchFile(file, function(current, previous) {
                    if ( + current.mtime !== + previous.mtime) {
                        if (files[file]) {
                            if (files[file].destruct) {
                                files[file].destruct();
                            }
                        }
                        delete require.cache[require.resolve(file)];
                        req(file, callback);
                    }
                });
            }
        });
    });
};

