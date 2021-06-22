import * as express from 'express';
import LoggerMiddleware from './middleware/logger'

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: any[], port: any) {
        this.app = express();
        this.port = port;
     
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use( express.json() );
        this.app.use( LoggerMiddleware.log );
    }
     
    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller: any) => {
            this.app.use( '/api/'  , controller.router );
        });
    }
     
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Expy is up and running at http://localhost:${this.port}/api/`);
        });
    }
}

export default App;