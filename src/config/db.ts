import { Dialect, Sequelize } from 'sequelize';

export default class DBConfig {
    private HOST;
    private USER;
    private PASSWORD;
    private DB;
    private dialect: Dialect = 'mysql';
    private sequelize: Sequelize;

    constructor() {

        this.HOST = process.env.MYSQL_HOST;
        this.USER = process.env.MYSQL_USER;
        this.PASSWORD = process.env.MYSQL_PASSWORD;
        this.DB = process.env.MYSQL_DATABASE;

        this.sequelize = new Sequelize(this.DB!, this.USER!, this.PASSWORD!, {
            host: this.HOST!,
            dialect: this.dialect,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });

        Promise.resolve(this.testConnection()).catch(error => console.log('Database connection error: ', error));
    }

    async testConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database: ', error);
        }
    }

    async closeConnection() {
        try {;
            await this.sequelize.close()
            console.log('Connection has been closed successfully.');
        } catch (error) {
            console.error('Unable to close connection to the database: ', error);
        }
    }
}
