import * as express from 'express';
import MethodNotAllowedException from '../exceptions/method_exception';
 
class SessionController {
  public path = '/session';
  public router = express.Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.post(this.path, this.createSession.bind(this));
    this.router.get(this.path, this.getSession.bind(this));
  }
 
  createSession = (request: express.Request, response: express.Response) => {
    response.status(200).send({
        status: true,
        detail: 'This is the session endpoint',
    });
  }

  getSession = (request: express.Request, response: express.Response, next: any) => {
    next(new MethodNotAllowedException())
  }
 
}
 
export default SessionController;