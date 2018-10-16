import Router from 'koa-router';
import path from 'path';
import fs, { exists } from 'fs';
const formparser = require('co-busboy');
const Stream = require('stream');

const apiRouter = Router();

class Api {
    static routes(app) {
        
        // all api define
        apiRouter.get('/userinfo/:name', async (ctx, next) => {
            console.log('NAME: ', ctx.params)
            const data = {
                id: 1,
                name: 'lemon',
                age: 22
            };
            // ctx.redirect('https://koajs.com')
            ctx.cookies.set('name', 'frank', {maxAge: 600000, path: '/userinfo'})
            ctx.response.append('Set-Cookie', 'age=23; maxAge: 600000; path:/userinfo')
            // ctx.response.status = 200;
            // ctx.response.lastModified = '2018-08-08T10:05:00';
            // ctx.response.etag = 'W/"123456789"'
            // ctx.response.set('Foo', ['bar', 'baz']);
            ctx.set('Foo', ['bar', 'baz']);
            // ctx.response.set('Set-Cookie','sex=male; maxAge: 600000; path:/userinfo')
            ctx.response.body = {
                code: 0,
                data,
                message: 'succ'
            };
            // ctx.response.redirect('back', '/index.html');


        });
        // all api define
        apiRouter.get('/download/*', async (ctx, next) => {    
            console.log('download url', ctx.request.path)
            const file = path.join(__dirname, '..', ctx.url.replace('download', 'upload'));
            ctx.response.body = fs.createReadStream(file);
        });
        apiRouter.get('/svg/*', async (ctx, next) => {    
            console.log('download url', ctx.request.path)
            const file = path.join(__dirname, '..', ctx.url.replace('svg', 'upload'));
            ctx.set('Content-Type', 'image/svg+xml')
            ctx.response.body = fs.createReadStream(file);
        });
        
        apiRouter.post('/upload', async (ctx, next) => {
            const parts = formparser(ctx.request);
            let part, fileNames = [];
            part = await parts();

            const filename = part.filename
            fileNames.push(filename);
            const homeDir = path.resolve(__dirname, '..');
            const uploadDir = path.join(homeDir,'upload');
            fs.exists(uploadDir, exists => {
                if(!exists) {
                    fs.mkdirSync(uploadDir);
                }

                const newpath = path.join(uploadDir, filename);

                const stream = fs.createWriteStream(newpath);
                part.on('data', (chunk) => {
                    stream.write(chunk)
                })
                part.on('end', function () {
                    console.log('END');
                    stream.end()
                });
            })


     
            if(fileNames.length > 0) {
                ctx.response.body = {
                    code: 0,
                    message: 'succ'
                }
            }

        });

        app.use(apiRouter.routes());

    }


}

export default Api