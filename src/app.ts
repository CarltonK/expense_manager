import * as express from 'express';
import errorMiddleware from './middlewares/error';
import LoggerMiddleware from './middlewares/logger'

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: any[], port: any) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(LoggerMiddleware.log);
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller: any) => {
            this.app.use('/api/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`##########\nExpy is up\n##########`);
        });
    }
}


export default App;