import App from './app';
import DBConfig from './config/db';
import BaseController from './controllers/base';
import SessionController from './controllers/session';
import UserController from './controllers/user';

const port = process.env.PORT || 8080;

const db = new DBConfig();
export default db;

const app = new App(
  [
    new BaseController(),
    new SessionController(),
    new UserController(),
  ],
  port,
);

db.runSeeds()
  .then((value) => db.runMigrations())
  .then((value) => app.listen())
  .catch((error) => { console.error(error); process.exit(1) })