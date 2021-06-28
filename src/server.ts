import App from './app';
import DBConfig from './config/db';
import BaseController from './controllers/base';
import SessionController from './controllers/session';
import UserController from './controllers/user';

const port = process.env.PORT || 8080;

new DBConfig();

const app = new App(
  [
    new BaseController(),
    new SessionController(),
    new UserController(),
  ],
  port,
);
 
app.listen();