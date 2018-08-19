import Router from 'koa-router';
import path from 'path';
import fs, { exists } from 'fs';
const formparser = require('co-busboy');

const apiRouter = Router();

class Api {
    static routes(app) {
        
        // all api define
        apiRouter.get('/userinfo', async (ctx, next) => {

            const data = {
                id: 1,
                name: 'lemon',
                age: 22
            };
            // ctx.redirect('https://koajs.com')
            ctx.cookies.set('name', 'frank', {maxAge: 600000, path: '/userinfo'})
            ctx.response.body = {
                code: 0,
                data,
                message: 'succ'
            }

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
                rs.on('end', function () {
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