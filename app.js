const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path');
const proxy = require('http-proxy-middleware')
import myRouter from './router';

const config = require('./config/default.json');
const { staticPath, port } = config;


const app = new Koa();
app.use(cors());
// app.use(bodyParser());

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
// const host = 'https://api.douban.com/v2/movie/in_theaters?start=0&count=10'; // 需要代理的服务器主机   http://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a
const host = 'http://sandbox.activity.browser.intl.miui.com'
// app.use(proxy({
//     host: 'sandbox.activity.browser.intl.miui.com',
//     match: '/^\/activity\//'
// }));
app.use(async (ctx, next) => {
    if(ctx.url.startsWith('/activity')) {
        ctx.respond = false
        return proxy({
            target: host, // 服务器地址
            changeOrigin: true,
            secure: false,
        })(ctx.req, ctx.res, next)
    }
    return next()
})

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
