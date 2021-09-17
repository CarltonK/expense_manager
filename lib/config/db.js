"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const child_process_1 = require("child_process");
class DBConfig {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async runMigrations() {
        return new Promise((resolve, reject) => {
            child_process_1.exec('npm run migrations:prod', { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                }
                else if (stdout) {
                    console.log(stdout);
                }
                else {
                    console.log(stderr);
                }
                resolve(stdout ? true : false);
            });
        });
    }
}
exports.default = DBConfig;
//# sourceMappingURL=db.js.map