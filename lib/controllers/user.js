"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const server_1 = require("../server");
const auth_service_1 = require("../services/auth_service");
const missing_param_exception_1 = require("../exceptions/missing_param_exception");
const auth_1 = require("../middlewares/auth");
class UserController {
    constructor() {
        this.path = '/user';
        this.router = express.Router();
        this.createUser = async (request, response) => {
            try {
                const { userId, password, phoneNumber } = request.body;
                if (!userId) {
                    throw new missing_param_exception_1.default('userId');
                }
                if (!password) {
                    throw new missing_param_exception_1.default('password');
                }
                if (!phoneNumber) {
                    throw new missing_param_exception_1.default('phoneNumber');
                }
                const user = await this.auth.userRegistration(request.body);
                response.status(201).send({
                    status: true,
                    detail: 'Account created successfully',
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
        this.getUsers = async (request, response) => {
            try {
                const users = await server_1.default.prisma.user.findMany({});
                response.status(200).send({
                    status: true,
                    detail: "success",
                    data: { users },
                });
            }
            catch (error) {
                response.status(500).send({
                    status: false,
                    detail: `${error}`,
                });
            }
        };
        this.intializeRoutes();
        this.auth = new auth_service_1.default();
    }
    intializeRoutes() {
        this.router.post(this.path, this.createUser.bind(this));
        this.router.get(this.path, auth_1.default.auth, this.getUsers.bind(this));
    }
}
exports.default = UserController;
//# sourceMappingURL=user.js.map