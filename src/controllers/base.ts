import * as express from 'express';

class BaseController {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.livenessCheck.bind(this));
  }

  livenessCheck = (request: express.Request, response: express.Response) => {
    response.status(200).send({
      status: true,
      detail: 'Expy is live',
    });
  }

}

export default BaseController;