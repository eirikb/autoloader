var fs = require('fs'),
path = require('path'),
winston = require('winston'),
bot = require('./bot.js'),
pluginFullPath = path.join('/', path.join(path.dirname(__filename), 'plugins/')),
plugins = {},
req = function(file) {
    var plugin = file.replace(/.*\//, '').green;
    winston.info('[plugins] Require plugin ' + plugin);
    try {
        return require(file);
    } catch(e) {
        winston.error('[plugins] Error while loading plugin ' + plugin + ' (' + e.toString() + ')');
    }
    return null;
};

exports.watch = function() {
    winston.info('[plugins] Watching ' + pluginFullPath.yellow + ' for plugins');
    fs.readdir(pluginFullPath, function(err, files) {
        files.forEach(function(file) {
            if (file.match(/\.js$/)) {

                file = pluginFullPath + file;
                plugins[file] = req(file);

                fs.watchFile(file, function(current, previous) {
                    if ( + current.mtime !== + previous.mtime) {
                        if (plugins[file]) {
                            bot.removeListeners(file);
                            if (plugins[file].destruct) {
                                plugins[file].destruct();
                            }
                        }
                        winston.info('[plugins] Removing ' + file.replace(/^.*\//, '').green + ' from cache');
                        delete require.cache[require.resolve(file)];
                        plugins[file] = req(file);
                    }
                });
            }
        });
    });
};

