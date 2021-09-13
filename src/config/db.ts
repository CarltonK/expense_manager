import { PrismaClient } from "@prisma/client";

export default class DBConfig {
    public prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
}
