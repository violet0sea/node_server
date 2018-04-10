import Router from 'koa-router';
import path from 'path';
import fs from 'fs';
const formparser = require('co-busboy');

const apiRouter = Router();

class Api {
    static routes(app) {
        
        // all api define
        apiRouter.post('/upload', async (ctx, next) => {
            var parts = formparser(ctx.request);
            console.log(ctx.request.body)
            var part, fileNames = [];
            part = await parts();
            // while(part) {
                var filename = part.filename
                console.log('filename', filename, part);
                fileNames.push(filename);
                var homeDir = path.resolve(__dirname, '..');
                var newpath = path.join(homeDir,'upload', filename);
                console.log(newpath);
                var stream = fs.createWriteStream(newpath);
                part.on('data', (chunk) => {
                    stream.write(chunk)
                })

            // }
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