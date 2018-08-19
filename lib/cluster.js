const cluster = require('cluster');

function startWorker() {
    const worker = cluster.fork();
}