export type TMeta = {
  totalDocuments: number;
  totalPage: number;
  page: number;
  limit: number;
};

export type TResponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
  meta?: TMeta;
};
