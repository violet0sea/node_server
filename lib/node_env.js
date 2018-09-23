console.log(__dirname);
console.log(__filename);
console.log(process.cwd());

var a = {a:1};
setTimeout(() => {
    console.log(a)
}, 1000);
exports.default = a;