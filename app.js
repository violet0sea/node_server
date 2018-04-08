const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const multer = require('koa-multer');
const formparser = require('co-busboy');
const config = require('./config/default.json');

const app = new Koa();
app.use(cors());
app.use(bodyParser());


const { staticPath, port } = config;

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
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

router.get('/vue', async (ctx, next) => {
    // ctx.response.body = `<h1>Index</h1>
    //     <form action="/signin" method="post">
    //         <p>Name: <input name="name" value="koa"></p>
    //         <p>Password: <input name="password" type="password"></p>
    //         <p><input type="submit" value="Submit"></p>
    //     </form>`;
    let fullStaticPath = path.join(__dirname, staticPath);
     // 获取静态资源内容，有可能是文件内容，目录，或404
    var text = fs.readFileSync(path.join(fullStaticPath,'vue.html'), 'utf8');
    ctx.response.body = text;
    // ctx.response.header = {
    //     ...ctx.response.header,
    //     "Cache-Control": config.cacheControl
    // }

    // 设置请求头
    if(config.cacheControl) {
        ctx.set("Cache-Control", config.cacheControl)
    }

    
});

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
});

router.post('/upload', async (ctx, next) => {
    var parts = formparser(ctx.request);
    console.log(ctx.request.body)
    var part, fileNames = [];
    part = await parts();
    // while(part) {
        var filename = part.filename
        console.log('filename', filename, part);
        fileNames.push(filename);
        var homeDir = path.resolve(__dirname, '..');
        var newpath = path.join(__dirname,'upload', filename);
        console.log(newpath);
        var stream = fs.createWriteStream(newpath);
        part.on('data', (chunk) => {
            console.log(11122)
            stream.write(chunk)
        })

    // }
    if(fileNames.length > 0) {
        ctx.response.body = {
            code: 0,
            message: 'succ'
        }
    }
    // const homeDir = path.resolve(__dirname, '..');
    // const newPath = path.join(__dirname , 'upload');
    // console.log('newPath', newPath)
    // var storage = multer.diskStorage({  
    //     //文件保存路径  
    //     dest: 'upload'
    // }) 
    // var upload = multer({ storage: storage });  
    // console.log(upload)
    // //路由  
    // router.post('/upload', upload.single('file'), async (ctx, next) => {  
    // ctx.response.body =  ctx.req.file.filename//返回文件名  
    
    // })

});

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

app.use(bodyParser());
app.use(router.routes());
app.listen(port);
console.log(`App is listen at port ${port}....`);
