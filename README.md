Autoloader
-

Watches a directory, loads and reloads all files when they are updated.

Example
--

    var autoloader = require('./autoloader.js');

    autoloader.watch('./lol', function(err, file) {
        console.log('loaded:', err, file);
    });

