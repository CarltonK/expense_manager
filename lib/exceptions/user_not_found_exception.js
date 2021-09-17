"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("./http_exception");
class UserNotFoundException extends http_exception_1.default {
    constructor(param) {
        super(404, `User not found`);
        this.param = param;
        this.message = `User with the identifier ${this.param} was not found`;
    }
}
exports.default = UserNotFoundException;
//# sourceMappingURL=user_not_found_exception.js.map