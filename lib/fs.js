const fs = require('fs');
const path = require('path');
const util = require('util');
const zlib = require('zlib');

// const dir = path.join(__dirname, '..');
// console.log(dir, __dirname)
// fs.readdir(dir, (err, files) => {
//     console.log(files)
// })

// fs.createReadStream(__filename).pipe(process.stdout);

// let data = '';
// const readableStream = fs.createReadStream(__filename);

// readableStream.setEncoding('utf8');
// readableStream.on('data', chunk => {
//     console.log('readable:', readableStream.readable)
//     data += chunk;
// });

// readableStream.on('end', () => {
//     console.log('end', data)
//     console.log('readable:', readableStream.readable)
// })

// fs.createReadStream(path.join(__dirname, './cat.png'))
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream(path.join(__dirname, './cat1.png.zip')))

console.log(process.env.HOME)
process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write('data: ' + chunk);
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});


process.on('uncaughtException', err => {
    console.log('got an error: %s', err.stack);
    process.exit(1);
});



setTimeout(() => {
    throw new Error('fail');
}, 0);