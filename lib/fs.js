const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
console.log(dir, __dirname)
fs.readdir(dir, (err, files) => {
    console.log(files)
})