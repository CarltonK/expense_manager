"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("./http_exception");
class MethodNotAllowedException extends http_exception_1.default {
    constructor() {
        super(405, `Method not allowed`);
    }
}
exports.default = MethodNotAllowedException;
//# sourceMappingURL=method_exception.js.map