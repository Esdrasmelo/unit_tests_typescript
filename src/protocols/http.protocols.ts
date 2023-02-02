import { IHttpResponse } from "../types";

export const okResponse = <DataType>(
  data: DataType
): IHttpResponse<DataType> => ({
  body: data,
  status: 200,
});

export const badRequestResponse = <DataType>(
  errorMessage: DataType
): IHttpResponse<DataType> => ({
  body: errorMessage,
  status: 400,
});

export const notFoundResponse = <DataType>(
  errorMessage: DataType
): IHttpResponse<DataType> => ({
  body: errorMessage,
  status: 404,
});

export const createdResponse = <DataType>(
  data: DataType
): IHttpResponse<DataType> => ({
  body: data,
  status: 201,
});