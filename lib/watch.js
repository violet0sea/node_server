const fs = require('fs');

fs.watch('./watchdir', console.log);
fs.watchFile('./watchdir', console.log);