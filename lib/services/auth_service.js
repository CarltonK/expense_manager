"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const http_exception_1 = require("../exceptions/http_exception");
const incorrent_credentials_exception_1 = require("../exceptions/incorrent_credentials_exception");
const user_not_found_exception_1 = require("../exceptions/user_not_found_exception");
const server_1 = require("../server");
const jwt_utility_1 = require("../utils/jwt_utility");
class AuthService {
    constructor() {
        this.jwt = new jwt_utility_1.default();
    }
    async userRegistration(data) {
        const { password } = data;
        try {
            data.password = await bcryptjs_1.hash(password, 10);
            const user = await server_1.default.prisma.user.create({ data });
            delete data.password;
            delete data.phoneNumber;
            data.token = await this.jwt.signAccessToken(user);
            return data;
        }
        catch (error) {
            throw new http_exception_1.default(400, `${error.message}`);
        }
    }
    async userLogin(data) {
        try {
            const { userId, password } = data;
            const user = await server_1.default.prisma.user.findUnique({
                where: { userId },
            });
            if (!user) {
                throw new user_not_found_exception_1.default(`${userId}`);
            }
            const checkPassword = await bcryptjs_1.compare(password, user.password);
            if (!checkPassword)
                throw new incorrent_credentials_exception_1.default();
            const token = await this.jwt.signAccessToken(user);
            return { userId, token };
        }
        catch (error) {
            throw new http_exception_1.default(400, `${error.message}`);
        }
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth_service.js.map