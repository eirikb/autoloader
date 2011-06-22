var fs = require('fs'),
    plugins = {},
    req = function(file) {
        try {
            return require(file);
        } catch(e) {
            console.log('Error', file, e);
        }
        return null;
    },
    watchDir = function(dir) {
        fs.readdir(dir, function(err, files) {
            files.forEach(function(file) {
                file = dir + file;
                plugins[file] = req(file);

                fs.watchFile(file, function(current, previous) {
                    if ( + current.mtime !== + previous.mtime) {
                        plugins[file] && plugins[file].destruct && plugins[file].destruct();
                        delete require.cache[require.resolve(file)];
                        plugins[file] = req(file);
                    }
                });
            });
        });
    };

exports.watch = function(dir) {
    watchDir(dir);
    fs.watchFile(dir, function() {
        watchDir(dir)
    });
};

