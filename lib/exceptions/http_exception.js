"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(expyCode, detail) {
        super(detail);
        this.expyCode = expyCode;
        this.status = false;
        this.detail = detail;
    }
}
exports.default = HttpException;
//# sourceMappingURL=http_exception.js.map