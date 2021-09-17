import HttpException from "./http_exception";

class MissingParamException extends HttpException {
    public param: string;
    constructor(param: string) {
        super(400, `Invalid Parameters`);
        this.param = param;
        this.message = `${this.param} is missing`;
    }
}

export default MissingParamException;