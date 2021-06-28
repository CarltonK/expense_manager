import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http_exception';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const code = error.expyCode || 500;
    const status = error.status;
    const detail = error.detail || 'Internal Server Error';
    response
        .status(code)
        .send({
            status,
            detail,
        })
}

export default errorMiddleware;