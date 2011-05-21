var fs = require('fs'),
plugins = {},
watchDir = function(dir) {
	fs.readdir(dir, function(err, files) {
		files.forEach(function(file) {
			file = dir + file;
			plugins[file] = require(file);

			fs.watchFile(file, function(current, previous) {
				if ( + current.mtime !== + previous.mtime) {
					plugins[file].destruct && plugins[file].destruct();
					delete require.cache[require.resolve(file)];
					plugins[file] = require(file);
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

