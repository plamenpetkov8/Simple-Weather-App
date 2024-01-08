export class ResponseError extends Error {
  constructor(message, res) {
    super(message);
    this.response = res;
  }
}
