const stream = require('stream');
const util = require('util');

util.inherits(MemoryStream, stream.Readable);

function MemoryStream(options) {
    options = options || {};
    options.objectMode = true;
    stream.Readable.call(this, options);
}

MemoryStream.prototype._read = function(size) {
    this.push(process.memoryUsage());
}
const memory = new MemoryStream();
memory.on('readable', function() {
    var output = memory.read();
    console.log('Type: %s, value: %j', typeof output, output);
})