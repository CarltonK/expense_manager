import * as express from 'express';
import db from '../server';
import AuthService from '../services/auth_service';
import MissingParamException from '../exceptions/missing_param_exception';
import auth from '../middlewares/auth';

class UserController {
  public path = '/user';
  public router = express.Router();
  private auth: AuthService;

  constructor() {
    this.intializeRoutes();
    this.auth = new AuthService();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.createUser.bind(this));
    this.router.get(this.path, auth, this.getUsers.bind(this));
  }

  createUser = async (request: express.Request, response: express.Response) => {

    try {
      const { userId, password, phoneNumber } = request.body;

      if (!userId) throw new MissingParamException('userId');


      if (!password) throw new MissingParamException('password');


      if (!phoneNumber) throw new MissingParamException('phoneNumber');

      const user = await this.auth.userRegistration(request.body);

      response.status(201).send({
        status: true,
        detail: 'Account created successfully',
        data: user,
      });
    } catch (error: any) {
      response.status(error.expyCode).send({
        status: false,
        detail: `${error.message}`,
      });
    }
  }

  getUsers = async (request: express.Request, response: express.Response) => {
    try {
      const userObject = {
        id: true,
        userId: true,
        email: true,
        lastLogin: true,
        registeredAt: true,
        name: true,
        phoneNumber: true,
        expenses: true,
      }

      const users = await db.prisma.user.findMany({
        select: userObject,
      });
      
      response.status(200).send({
        status: true,
        detail: "success",
        data: { users },
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        detail: `${error}`,
      });
    }
  }

}

export default UserController;