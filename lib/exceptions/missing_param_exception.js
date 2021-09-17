"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("./http_exception");
class MissingParamException extends http_exception_1.default {
    constructor(param) {
        super(400, `Invalid Parameters`);
        this.param = param;
        this.message = `${this.param} is missing`;
    }
}
exports.default = MissingParamException;
//# sourceMappingURL=missing_param_exception.js.map