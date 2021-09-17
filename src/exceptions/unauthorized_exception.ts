import HttpException from "./http_exception";

class UnauthorizedException extends HttpException {
    public param: string;
    constructor(param: string) {
        super(403, `Unauthorized`);
        this.param = param;
        this.message = param;
    }
}

export default UnauthorizedException;