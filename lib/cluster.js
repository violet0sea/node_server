// const cluster = require('cluster');

// function readfile(file) {
//     console.log('reading:')
//     require('fs').createReadStream(file).pipe(process.stdout);
// }
// function Bomb() {
//     this.msg = 'bomb';
// }

// Bomb.prototype.explore = function() {
//     console.log(this.msg);
// }
// console.log(Bomb.explore)
// const bomb = new Bomb();
// setTimeout(bomb.explore.bind(bomb),0);

function monitor() {
    console.log(process.memoryUsage());
}

var id = setInterval(monitor, 9000);
id.unref();

setTimeout(function() {
    console.log('done!');
}, 5000);
// // process.stdin.setEncoding('utf8');

// // process.stdin.on('data', text => {
// //     // console.log(1, text)process.stdin.setEncoding('utf8');
// //     
// // })


// process.stdin.resume();
// process.stdin.setEncoding('utf8');
// process.stdin.on('data', text => {

// // process.stdout.write('data: ' + text.toUpperCase());
// process.stdout.write("data: "+ text.toUpperCase());

// });

// function startWorker() {
//     const worker = cluster.fork();
// }

// var timer = setInterval(function () {
// 	console.log(new Date, 1)
// }, 1000)
var fn = function () {
	console.log(new Date, 2)
}
var timer2 = setInterval(fn, 1000)
timer2.unref()