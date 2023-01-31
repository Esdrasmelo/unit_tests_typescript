import { HttpResponse } from "../types";

export const okResponse = <DataType>(
  data: DataType
): HttpResponse<DataType> => ({
  body: data,
  status: 200,
});

export const badRequestResponse = <DataType>(
  errorMessage: DataType
): HttpResponse<DataType> => ({
  body: errorMessage,
  status: 400,
});

export const notFoundResponse = <DataType>(
  errorMessage: DataType
): HttpResponse<DataType> => ({
  body: errorMessage,
  status: 404,
});

export const createdResponse = <DataType>(
  data: DataType
): HttpResponse<DataType> => ({
  body: data,
  status: 201,
});