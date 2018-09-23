"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("./page");
const api_1 = require("./api");
class Router {
    static routes(app) {
        // all routers define
        page_1.default.routes(app);
        api_1.default.routes(app);
    }
}
exports.default = Router;
//# sourceMappingURL=index.js.map