export interface IException {
  message: string;
  code?: number;
  cause?: Error;
  description?: string;
}
