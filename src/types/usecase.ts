type ServiceResponse<T> = {
  code?: number;
  error?: boolean;
  data?: T;
  message?: string;
  validation?: {
    field: string;
    message: string;
  }[];
};

export default ServiceResponse;
