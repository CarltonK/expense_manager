import * as express from 'express';
import HttpException from '../exceptions/http_exception';
import MissingParamException from '../exceptions/missing_param_exception';
import auth from '../middlewares/auth';

class ExpenseController {
    public path = '/expense';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, auth, this.getExpenses.bind(this));
        this.router.post(this.path, auth, this.createExpense.bind(this));
    }

    createExpense = (request: express.Request, response: express.Response) => {
        try {

            const { title, paymentMode, isDueOn } = request.body;

            if (!title) throw new MissingParamException('title');

            if (!paymentMode) throw new MissingParamException('paymentMode');
            const paymentModes: string[] = ['Mpesa','Bank Transfer', 'Credit Card', 'Cash'];
            if (!paymentModes.includes(paymentMode)) throw new HttpException(400,`paymentMode should be one ${paymentModes}`);

            if (!isDueOn) throw new MissingParamException('isDueOn');

            response.status(200).send({
                status: true,
                detail: `Expy (${process.env.NODE_ENV}) is running ${process.env.VERSION_TAG}`,
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