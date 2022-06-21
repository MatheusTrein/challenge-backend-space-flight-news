interface ICreateAppError {
  message: string;
  statusCode?: number;
  additionalInformation?: object;
}

class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly additionalInformation: object;

  constructor({
    message,
    statusCode = 400,
    additionalInformation = {},
  }: ICreateAppError) {
    this.message = message;
    this.statusCode = statusCode;
    this.additionalInformation = additionalInformation;
  }
}

export { AppError };
