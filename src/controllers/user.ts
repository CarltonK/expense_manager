import * as express from 'express';
import MissingParamException from '../exceptions/missing_param_exception';
import db from '../server';

class UserController {
  public path = '/user';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.createUser.bind(this));
    this.router.get(this.path, this.getUsers.bind(this));
  }

  createUser = async (request: express.Request, response: express.Response) => {

    try {
      const { name, identificationValue, phoneNumber, password } = request.body;

      if (!name) {
        throw new MissingParamException('Name')
      }

      if (!identificationValue) {
        throw new MissingParamException('Identification Value')
      }

      if (!phoneNumber) {
        throw new MissingParamException('Phone Number')
      }

      if (!password) {
        throw new MissingParamException('Password')
      }

      await db.prisma.user.create({
        data: request.body,
      });

      response.status(201).send({
        status: true,
        detail: {
          user: {
            name,
          },
        },
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        detail: `${error}`,
      });
    }
  }

  getUsers = async (request: express.Request, response: express.Response) => {
    try {
      const users = await db.prisma.user.findMany({});
      console.log('Users: ', users);
      response.status(200).send({
        status: true,
        detail: { users },
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