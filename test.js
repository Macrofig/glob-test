var Glob = require('glob').Glob;
var pathLib = require('path');
var expect = require('expect');

var log = console.log;

// Same options provided by Karma
var GLOB_OPTS = {
    cwd: '/',
    follow: true,
    nodir: true,
    sync: true
};

// This pattern succeeds
var pattern = __dirname + '/test/**/*.*';
log('pattern: ', pathLib.normalize(pattern));

var glob = new Glob(pathLib.normalize(pattern), GLOB_OPTS);

// Expects
expect(glob.found.length).toBeGreaterThan(0, 'Found some items');

glob.found.map(function (path) {
    log(path);
    expect(glob.statCache[path]).toExist('Processed file correctly');
    var mtime = glob.statCache[path].mtime
});

// This pattern fails
var pattern = __dirname + '/test/**/*.{js,stache}';
log('pattern: ', pathLib.normalize(pattern));

var glob = new Glob(pathLib.normalize(pattern), GLOB_OPTS);

// Expects
expect(glob.found.length).toBeGreaterThan(0, 'Found some items');

glob.found.map(function (path) {
    log(path);
    expect(glob.statCache[path]).toExist('Processed file correctly');
    var mtime = glob.statCache[path].mtime
});
