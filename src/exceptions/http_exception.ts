class HttpException extends Error {
  expyCode: number;
  status: boolean;
  detail: string;
  constructor(expyCode: number, detail: string) {
    super(detail);
    this.expyCode = expyCode;
    this.status = false;
    this.detail = detail;
  }
}

export default HttpException;