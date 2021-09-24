import { PrismaClient } from "@prisma/client";
import { exec } from "child_process"

export default class DBConfig {
    public prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async runMigrations() {
        return new Promise((resolve, reject) => {
            exec('npm run migrations:prod', { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
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

    async runSeeds() {
            const paymentModeSeedOps: Promise<any>[] = [
                this.prisma.paymentMode.upsert({
                    where: { id: 1 },
                    update: {},
                    create: { id: 1, mode: 'Mpesa' },
                }),
                this.prisma.paymentMode.upsert({
                    where: { id: 2 },
                    update: {},
                    create: { id: 2, mode: 'Bank Transfer' },
                }),
                this.prisma.paymentMode.upsert({
                    where: { id: 3 },
                    update: {},
                    create: { id: 3, mode: 'Credit Card' },
                }),
                this.prisma.paymentMode.upsert({
                    where: { id: 4 },
                    update: {},
                    create: { id: 4, mode: 'Cash' },
                }),
            ];
            return Promise.all(paymentModeSeedOps);
    }
}
