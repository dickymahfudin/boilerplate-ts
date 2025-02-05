export {};

declare global {
  namespace Express {
    export interface Response {
      customResponse({
        message,
        data = {},
        code = 200,
        validations = [],
      }: {
        message: string;
        data?: any;
        code?: number;
        validations?: any[];
      }): Response;
    }
  }
}
