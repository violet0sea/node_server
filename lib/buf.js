const fs = require('fs');

fs.readFile('./names.txt', (err, data) => {
    console.log(data.toString('ascii'));
});

// var encoding = 'base64';
// var mime = 'image/png';
// var data = fs.readFileSync('./cat.png').toString(encoding);
// var uri = 'data:' + mime + ';' + encoding + ',' + data;
// // console.log(uri.length, data.length);
// var copy = uri.split(',')[1];
// var buf = Buffer(copy, 'base64');
// fs.writeFileSync('catCopy.png', buf);

fs.readFile('./cat.png', (err, buf) => {
    console.log(buf, buf.readUInt32LE(4))
});

var zlib = require('zlib');
var header = new Buffer(2);
header[0] = 8;
header[1] = 0;

zlib.deflate('my messsage', (err, deflatebuf) => {
    if(err) return console.log(err);
    console.log(deflatebuf)
    var message = Buffer.concat([header, deflatebuf]);
    store(message);
});

var database =[[], [], [], [], [], [], [], []];
var bitmasks = [1,2,4,8,16,32,64,128];

function store(buf) {
    var db = buf[0];
    var key = buf.readUInt8(1);

    if(buf[2] === 0x78) {
        zlib.inflate(buf.slice(2), (err, inflatedbuf) => {
            var data = inflatedbuf.toString();

            bitmasks.forEach((bitmask, index) => {
                if((db & bitmask) === bitmask) {
                    database[index][key] = data;
                }
            });

            console.log(database);
            fs.writeFile('./a.json', database, (err, data) => {

            })
        })
    }

}
