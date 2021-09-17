"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("./http_exception");
class IncorrectCredentialsException extends http_exception_1.default {
    constructor() {
        super(400, `Incorrect credentials`);
        this.message = `userId or password is not valid`;
    }
}
exports.default = IncorrectCredentialsException;
//# sourceMappingURL=incorrent_credentials_exception.js.map