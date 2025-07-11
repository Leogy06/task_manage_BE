export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // set the prototype explicitly to m,aintain the correct prototype chain
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
