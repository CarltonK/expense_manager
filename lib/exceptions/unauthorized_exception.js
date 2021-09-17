"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("./http_exception");
class UnauthorizedException extends http_exception_1.default {
    constructor(param) {
        super(403, `Unauthorized`);
        this.param = param;
        this.message = param;
    }
}
exports.default = UnauthorizedException;
//# sourceMappingURL=unauthorized_exception.js.map