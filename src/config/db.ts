import { PrismaClient } from "@prisma/client";
import { exec } from "child_process"

export default class DBConfig {
    public prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
        this.runMigrations().catch(error => console.error(error));
    }

    async runMigrations() {
        return new Promise((resolve, reject) => {
            exec('npx prisma migrate dev --name init', { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                } else if (stdout) {
                    console.log(stdout);
                } else {
                    console.log(stderr);
                }
                resolve(stdout ? true : false);
            });
        });
    }
}
