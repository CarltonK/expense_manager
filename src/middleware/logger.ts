import * as express from 'express';

class LoggerMiddleware {
    log(request: express.Request, response: express.Response, next: any) {
        console.log(`PATH: ${request.path} -> METHOD: ${request.method} `);
        next();
    }
}

export default new LoggerMiddleware();