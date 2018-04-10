import Router from 'koa-router';
import path from 'path';
import fs from 'fs';

const config = require('../config/default.json');

const pageRoute = new Router();
const { staticPath } = config;

class Page {
    static routes(app) {

        pageRoute.get('/vue', async (ctx, next) => {
            console.log(11)
            let fullStaticPath = path.join(__dirname, '../', staticPath);
            console.log(fullStaticPath)
            // 获取静态资源内容，有可能是文件内容，目录，或404
            var text = fs.readFileSync(path.join(fullStaticPath,'vue.html'), 'utf8');
            ctx.response.body = text;

            // 设置请求头
            if(config.cacheControl) {
                ctx.set("Cache-Control", config.cacheControl)
            }          
        });

        app.use(pageRoute.routes());
        
    }
}

export default Page