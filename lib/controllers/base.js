"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class BaseController {
    constructor() {
        this.path = '/';
        this.router = express.Router();
        this.livenessCheck = (request, response) => {
            response.status(200).send({
                status: true,
                detail: `Expy (${process.env.NODE_ENV}) is running ${process.env.VERSION_TAG}`,
            });
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.livenessCheck.bind(this));
    }
}
exports.default = BaseController;
//# sourceMappingURL=base.js.map