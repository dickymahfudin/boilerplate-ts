export {};

declare global {
  namespace Express {
    export interface Response {
      customSuccess({
        statusCode,
        message,
        data = {},
      }: {
        statusCode: number;
        message: string;
        data?: object;
      }): Response;
    }
  }
}
