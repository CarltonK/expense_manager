import { hash, compare } from 'bcryptjs';
import HttpException from '../exceptions/http_exception';
import IncorrectCredentialsException from '../exceptions/incorrent_credentials_exception';
import UserNotFound from '../exceptions/user_not_found_exception';
import db from '../server';
import JwtUtility from '../utils/jwt_utility';

export default class AuthService {
    private jwt: JwtUtility;

    constructor() {
        this.jwt = new JwtUtility();
    }

    async userRegistration(data: any): Promise<any> {
        const { password } = data;
        try {
            data.password = await hash(password, 10);
            const user = await db.prisma.user.create({ data });

            delete data.password;
            delete data.phoneNumber;

            data.token = await this.jwt.signAccessToken(user);
            return data;
        } catch (error: any) {
            throw new HttpException(400, `${error.message}`);
        }
    }

    async userLogin(data: any) {
        try {
            const { userId, password } = data;
            const user = await db.prisma.user.findUnique({
                where: { userId },
            });

            if (!user) {
                throw new UserNotFound(`${userId}`);
            }

            const checkPassword = await compare(password, user.password);

            if (!checkPassword) throw new IncorrectCredentialsException();

            const token = await this.jwt.signAccessToken(user);
            return { userId , token }
        } catch (error: any) {
            throw new HttpException(400, `${error.message}`);
        }
    }
}