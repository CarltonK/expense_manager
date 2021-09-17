"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const code = error.expyCode || 500;
    const status = error.status;
    const detail = error.detail || 'Internal Server Error';
    response
        .status(code)
        .send({
        status,
        detail,
    });
}
exports.default = errorMiddleware;
//# sourceMappingURL=error.js.map