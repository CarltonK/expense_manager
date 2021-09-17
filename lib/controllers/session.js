"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const method_exception_1 = require("../exceptions/method_exception");
const missing_param_exception_1 = require("../exceptions/missing_param_exception");
const auth_service_1 = require("../services/auth_service");
class SessionController {
    constructor() {
        this.path = '/session';
        this.router = express.Router();
        this.createSession = async (request, response, next) => {
            try {
                const { userId, password } = request.body;
                if (!userId) {
                    throw new missing_param_exception_1.default('userId');
                }
                if (!password) {
                    throw new missing_param_exception_1.default('password');
                }
                const user = await this.auth.userLogin(request.body);
                response.status(200).send({
                    status: true,
                    detail: 'success',
                    data: user,
                });
            }
            catch (error) {
                response.status(error.expyCode).send({
                    status: false,
                    detail: `${error.message}`,
                });
            }
        };
        this.getSession = (request, response, next) => {
            next(new method_exception_1.default());
        };
        this.intializeRoutes();
        this.auth = new auth_service_1.default();
    }
    intializeRoutes() {
        this.router.post(this.path, this.createSession.bind(this));
        this.router.get(this.path, this.getSession.bind(this));
    }
}
exports.default = SessionController;
//# sourceMappingURL=session.js.map