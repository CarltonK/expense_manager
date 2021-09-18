import * as express from 'express';

class LoggerMiddleware {
    log(request: express.Request, response: express.Response, next: any) {
        console.log(`PATH: ${request.path} -> METHOD: ${request.method} -> HOST: ${request.hostname}`);
        next();
    }

    logResponseBody(request: express.Request, response: express.Response, next: any) {
        const [oldWrite, oldEnd] = [response.write, response.end];
        const chunks: Buffer[] = [];

        (response.write as unknown) = function (chunk: any) {
            chunks.push(Buffer.from(chunk));
            (oldWrite as Function).apply(response, arguments);
        };

        response.end = function (chunk) {
            if (chunk) {
                chunks.push(Buffer.from(chunk));
            }
            const body = Buffer.concat(chunks).toString('utf8');
            console.log(`Expy said\n##########\n${body}\n##########`);
            (oldEnd as Function).apply(response, arguments);
        };
        if (next) {
            next();
        }
    }
}

export default new LoggerMiddleware();