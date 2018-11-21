const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const http = require('http');
const request = require('request');
const mysql = require('mysql');
const mongo = require('mongodb');
import myRouter from './router';
const dbConf = require('./config/db');


const config = require('./config/default.json');
const { staticPath, port } = config;

// mongodb连接
const mongoClient = mongo.MongoClient;
const mongoUrl = "mongodb://localhost:27017";

mongoClient.connect(mongoUrl, (err, db) => {
    if(err) {
        throw err;
    }
    console.log('mongodb is connected!');
    const database = db.db('test');
    database.collection('koa').find().toArray((err, result) => {
        console.log(result);
    })
})

// app.env = 'production'

const connection = mysql.createConnection({
    ...dbConf
});

connection.connect();

connection.query('select * from tbl', function(error, result, fields) {
    if(error) {
        throw error;
    }
});

const app = new Koa();
app.use(cors());
app.use(bodyParser());

app.use(async (ctx, next) => {
    console.log(`${new Date()} ${ctx.request.method} ${ctx.request.url}`);
    await next();
})

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});


let fullStaticPath = path.join(__dirname, staticPath);
// 获取静态资源内容，有可能是文件内容，目录，或404
app.use(serve(fullStaticPath));


router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
    await next();
});

router.get('/api/v1', async(ctx, next) => {

    const host = 'http://api.douban.com'; // 需要代理的服务器主机   http://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a
    // getaddrinfo ENOTFOUND 报错 host不可以加http
    const path = '/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a'; // 请求路径
    const reqPromise = function() {
        return new Promise((res, rej) => {
            request(host+path, (err, response, body) => {
                console.log(`1111`)
                res(body)
            });
        })
    }
    let res = await reqPromise();
    console.log(typeof res, res)
    const body = {
        header: 1,
        data: JSON.parse(res)
    }
    // res.setEncoding('utf8');
    ctx.set('Content-Type', 'application/json')
    ctx.response.body = body;
    
})


router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
    await next();
});

myRouter.routes(app);

app.use(bodyParser());
app.use(router.routes());
app.listen(port);



console.log(`App is listen at port ${port}....`);
