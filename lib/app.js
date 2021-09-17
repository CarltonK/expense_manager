"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const error_1 = require("./middlewares/error");
const logger_1 = require("./middlewares/logger");
class App {
    constructor(controllers, port) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(logger_1.default.log);
    }
    initializeErrorHandling() {
        this.app.use(error_1.default);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api/', controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`##########\nExpy is up\n##########`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map