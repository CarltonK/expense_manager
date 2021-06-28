import HttpException from "./http_exception";
 
class MethodNotAllowedException extends HttpException {
  constructor() {
    super(405, `Method not allowed`);
  }
}
 
export default MethodNotAllowedException;