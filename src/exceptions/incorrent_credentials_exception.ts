import HttpException from "./http_exception";

class IncorrectCredentialsException extends HttpException {
    constructor() {
        super(400, `Incorrect credentials`);
        this.message = `userId or password is not valid`;
    }
}

export default IncorrectCredentialsException;