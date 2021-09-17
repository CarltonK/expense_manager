"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoggerMiddleware {
    log(request, response, next) {
        console.log(`PATH: ${request.path} -> METHOD: ${request.method} -> HOST: ${request.hostname}`);
        next();
    }
}
exports.default = new LoggerMiddleware();
//# sourceMappingURL=logger.js.map