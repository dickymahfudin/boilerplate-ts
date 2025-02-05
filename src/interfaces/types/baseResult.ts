type BaseResult<T> = {
  status: boolean;
  message: string;
  code?: number;
  data?: T;
};

export default BaseResult;
