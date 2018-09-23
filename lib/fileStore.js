const fs = require('fs');
const EventEmitter = require('events').EventEmitter;

const DataBase = function(path) {
    this.path = path;

    this._records = Object.create(null);
    this._writeStream = fs.createWriteStream(this.path, {
        encoding: 'utf-8',
        flags: 'a'
    });

    this._load();
}

DataBase.prototype = Object.create(EventEmitter);

DataBase.prototype._load = function() {
    const stream = fs.createReadStream(this.path, {encoding: 'utf8'});
    const database = this;

    var data = '';
    stream.on('readable', function() {
        data += stream.read();
        const records = data.split('\n');
        data = records.pop();
        for(var i = 0; i < records.length; i++) {
            try{
                const record = JSON.parse(records[i]);
                if(record.value == null) {
                    delete database._records[record.key];
                } else {
                    database._records[recored.key] = record.value;
                }
            } catch(e) {
                database.emit('error', 'found invaild record: ', record[i]);
            }
        }
    });
    stream.on('end', function() {
        database.emit('load');
    });
}