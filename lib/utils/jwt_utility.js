"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const http_exception_1 = require("../exceptions/http_exception");
class JwtUtility {
    constructor() {
        this.accessToken = process.env.ACCESS_TOKEN;
        this.jwtSigningOptions = {
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
        };
    }
    signAccessToken(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.accessToken, this.jwtSigningOptions, (error, data) => {
                if (error) {
                    return reject(new http_exception_1.default(400, `${error.message}`));
                }
                resolve(data);
            });
        });
    }
    verifyAccessToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.accessToken, (error, data) => {
                if (error) {
                    const message = error.name === 'JsonWebTokenError' ? 'Unauthorized' : error.message;
                    return reject(new http_exception_1.default(400, `${message}`));
                }
                resolve(data);
            });
        });
    }
}
exports.default = JwtUtility;
//# sourceMappingURL=jwt_utility.js.map