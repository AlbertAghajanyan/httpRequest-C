"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const appRoutes_1 = require("./routes/appRoutes");
const restrictedRoutes_1 = require("./routes/restrictedRoutes");
let cookieParser = require('cookie-parser');
const compression = require("compression");
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        //create new token when app started
        this.appRouter = new appRoutes_1.AppRouter();
        this.restrictedRoutes = new restrictedRoutes_1.RestrictedRouter();
        this.express = express();
        this.middleware();
        this.routes();
        this.setupProd();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(cookieParser('signed-with-secret-key'));
        this.express.use(compression());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        this.accessControll();
        this.express.use('/', this.appRouter.getRouter());
        this.express.use('/restricted', this.restrictedRoutes.getRouter());
    }
    accessControll() {
        this.express.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Cookies');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            // Pass to next layer of middleware
            const orderID = req.query.orderid;
            next();
        });
    }
    setupProd() {
        console.log('ha1');
        /*
                    if (process.env.NODE_ENV == 'production') {
                        console.log('ha2');
                        //this.express.set('views', path.join(__dirname, 'views'));
                        //this.express.use(express.static('../dist'));
                        //this.express.use(express.static(path.join(__dirname, '../dist/server/view/index.html')));
                        this.express.use(express.static(path.join(__dirname, '../dist')));
                        this.express.get('*', (req, res) => {
                            console.log('ha3');
                            res.sendFile(path.join(__dirname, '../dist/server/view/index.html'));
                            console.log('ha4');
                        });
                        console.log('ha5');
        /*
        
        */
        /*
        this.express.set('views', path.join(__dirname, 'views'));
        this.express.use(express.static(path.join(__dirname, 'views')));
        var self = this;
        this.express.all('*', function (req, res) {
            res.status(200).sendFile(path.join(__dirname, self.configManager.getServerConfig().viewPath));
        });
        */
        //}
    }
}
console.log('ha6');
const app = new App().express;
exports.app = app;
//# sourceMappingURL=/home/abul/Desktop/PROJECT-new/intrusion_detector/web/dist/server/app.js.map