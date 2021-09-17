"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unauthorized_exception_1 = require("../exceptions/unauthorized_exception");
const jwt_utility_1 = require("../utils/jwt_utility");
class AuthMiddleware {
    constructor() {
        this.jwt = new jwt_utility_1.default();
    }
    async auth(request, response, next) {
        if (!request.headers.authorization) {
            return next(new unauthorized_exception_1.default('Authorization is required'));
        }
        const token = request.headers.authorization.split(' ')[1];
        if (!token) {
            return next(new unauthorized_exception_1.default('Access token is required'));
        }
        try {
            await this.jwt.verifyAccessToken(token);
            next();
        }
        catch (error) {
            next(new unauthorized_exception_1.default(`${error.message}`));
        }
    }
}
exports.default = new AuthMiddleware();
//# sourceMappingURL=auth.js.map