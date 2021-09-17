"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const base_1 = require("./controllers/base");
const session_1 = require("./controllers/session");
const user_1 = require("./controllers/user");
const port = process.env.PORT || 8080;
const db = new db_1.default();
exports.default = db;
const app = new app_1.default([
    new base_1.default(),
    new session_1.default(),
    new user_1.default(),
], port);
db.runMigrations()
    .then(value => { app.listen(); })
    .catch((error) => { process.exit(1); });
//# sourceMappingURL=server.js.map