import * as express from 'express';
import UnauthorizedException from '../exceptions/unauthorized_exception';
import JwtUtility from '../utils/jwt_utility';

class AuthMiddleware {

    async auth(request: express.Request, response: express.Response, next: any) {
        if (!request.headers.authorization) {
            return next(new UnauthorizedException('Authorization is required'));
        }

        const token = request.headers.authorization.split(' ')[1];

        if (!token) return next(new UnauthorizedException('Access token is required'))

        try {
            const jwt = new JwtUtility();
            await jwt.verifyAccessToken(token);
            next();
        } catch (error: any) {
            console.log(error)
            next(new UnauthorizedException(`${error.message}`))
        }
    }
}

export default new AuthMiddleware().auth;