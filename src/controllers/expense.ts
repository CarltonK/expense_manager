import * as express from 'express';
import HttpException from '../exceptions/http_exception';
import MissingParamException from '../exceptions/missing_param_exception';
import auth from '../middlewares/auth';
import db from '../server';
import JwtUtility from '../utils/jwt_utility';

class ExpenseController {
    public path = '/expense';
    public router = express.Router();
    private jwt: JwtUtility;

    constructor() {
        this.intializeRoutes();
        this.jwt = new JwtUtility();
    }

    public intializeRoutes() {
        this.router.get(this.path, auth, this.getExpenses.bind(this));
        this.router.post(this.path, auth, this.createExpense.bind(this));
    }

    createExpense = async (request: express.Request, response: express.Response) => {
        try {

            const { title, paymentMode, isDueOn } = request.body;

            if (!title) throw new MissingParamException('title');

            if (!paymentMode) throw new MissingParamException('paymentMode');
            const paymentModes: string[] = ['Mpesa', 'Bank Transfer', 'Credit Card', 'Cash'];
            if (!paymentModes.includes(paymentMode)) throw new HttpException(400, `paymentMode should be one of [${paymentModes.join(', ')}]`);

            if (!isDueOn) throw new MissingParamException('isDueOn');

            // Retrieve user data from token
            const userToken = request.headers.authorization!.split(' ')[1];
            const userTokenData: any = await this.jwt.verifyAccessToken(userToken);
            const { userId } = userTokenData;

            // Check if user with given userId exists
            const savedUserData = await db.prisma.user.findFirst({
                where: { userId },
            });

            if (!savedUserData) throw new HttpException(400, `Please register first`);

            const { id: savedUserId } = savedUserData;

            // Check if entered payment mode exists
            const savedPaymentModeData = await db.prisma.paymentMode.findFirst({
                where: { mode: paymentMode },
            });

            if (!savedPaymentModeData) throw new HttpException(400, `${paymentMode} is not recognized as a payment mode`);

            const { id } = savedPaymentModeData;
            const newExpense = await db.prisma.expense.create({
                data: {
                    authorId: savedUserId,
                    title: title,
                    paymentModeId: id,
                    isDueOn: new Date(isDueOn),
                }
            });

            response.status(201).send({
                status: true,
                detail: `A new expense has been successfully created`,
                data: newExpense,
            });
        } catch (error: any) {
            response.status(error.expyCode).send({
                status: false,
                detail: `${error.message}`,
            });
        }
    }

    getExpenses = (request: express.Request, response: express.Response) => {
        response.status(200).send({
            status: true,
            detail: `Expy (${process.env.NODE_ENV}) is running ${process.env.VERSION_TAG}`,
        });
    }

}

export default ExpenseController;