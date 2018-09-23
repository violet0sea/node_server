//代理转发请求

const http = require('http');
const host = 'api.douban.com'; // 需要代理的服务器主机   http://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a
// getaddrinfo ENOTFOUND 报错 host不可以加http
const path = '/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a'; // 请求路径

const app = http.createServer((req, res) => {
    const sreq = http.request({
        host,
        path,
        method: req.method
    }, sres => {
        sres.pipe(res);
        sres.on('end', () => {
            console.log('done');
        })
    });

    if(/POST|PUT/i.test(req.method)) {
        req.pipe(sreq);
    } else {
        sreq.end();
    }

});

app.listen(3001);
console.log('Server is running at port 3001');