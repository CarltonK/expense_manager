import App from './app';
// import DBConfig from './config/db';
import BaseController from './controllers/base';

const port = process.env.PORT || 8080;

// new DBConfig();

const app = new App(
  [
    new BaseController(),
  ],
  port,
);
 
app.listen();