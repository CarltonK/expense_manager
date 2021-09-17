import HttpException from "./http_exception";

class UserNotFoundException extends HttpException {
    public param: string;
    constructor(param: string) {
        super(404, `User not found`);
        this.param = param;
        this.message = `User with the identifier ${this.param} was not found`;
    }
}

export default UserNotFoundException;