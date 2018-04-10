import Page from './page';
import Api from './api';

class Router {
    static routes(app) {

        // all routers define
        Page.routes(app);
        Api.routes(app);

    }
}

export default Router