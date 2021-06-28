import * as express from 'express';
 
class UserController {
  public path = '/user';
  public router = express.Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.post(this.path, this.createUser.bind(this));
  }
 
  createUser = (request: express.Request, response: express.Response) => {
    response.status(200).send({
        status: true,
        detail: 'Create a user',
    });
  }
 
}
 
export default UserController;