import * as express from 'express';
import MethodNotAllowedException from '../exceptions/method_exception';
import MissingParamException from '../exceptions/missing_param_exception';
import AuthService from '../services/auth_service';

class SessionController {
  public path = '/session';
  public router = express.Router();
  private auth: AuthService;

  constructor() {
    this.intializeRoutes();
    this.auth = new AuthService();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.createSession.bind(this));
    this.router.get(this.path, this.getSession.bind(this));
  }

  createSession = async (request: express.Request, response: express.Response, next: any) => {
    try {
      const { userId, password } = request.body;

      if (!userId) throw new MissingParamException('userId');

      if (!password) throw new MissingParamException('password');

      const user = await this.auth.userLogin(request.body);

      response.status(200).send({
        status: true,
        detail: 'success',
        data: user,
      });
    } catch (error: any) {
      response.status(error.expyCode).send({
        status: false,
        detail: `${error.message}`,
      });
    }
  }

  getSession = (request: express.Request, response: express.Response, next: any) => {
    next(new MethodNotAllowedException());
  }

}

export default SessionController;