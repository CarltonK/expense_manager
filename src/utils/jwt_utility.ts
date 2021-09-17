import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/http_exception';

class JwtUtility {
    private accessToken: string | undefined;
    private jwtSigningOptions: jwt.SignOptions;
    constructor() {
        this.accessToken = process.env.ACCESS_TOKEN;
        this.jwtSigningOptions = {
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
        };
    }

    signAccessToken(payload: string | object | Buffer) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.accessToken!, this.jwtSigningOptions, (error, data) => {
                if (error) {
                    return reject(new HttpException(400, `${error.message}`));
                }
                resolve(data);
            });
        });
    }

    verifyAccessToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.accessToken!, (error, data) => {
                if (error) {
                    const message = error.name === 'JsonWebTokenError' ? 'Unauthorized' : error.message;
                    return reject(new HttpException(400, `${message}`));
                }
                resolve(data);
            })
        })
    }
}

export default JwtUtility;
