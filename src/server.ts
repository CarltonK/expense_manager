import App from './app';
import BaseController from './controllers/base';

const port = process.env.PORT || 8080;
 
const app = new App(
  [
    new BaseController(),
  ],
  port,
);
 
app.listen();