import { HttpResponse } from "../types";

export const okResponse = <DataType>(
  data: DataType
): HttpResponse<DataType> => ({
  body: data,
  status: 200,
});

export const badRequestResponse = <DataType>(
  data: DataType
): HttpResponse<DataType> => ({
  body: data,
  status: 400,
});

export const notFoundResponse = <DataType>(
  data: DataType
): HttpResponse<DataType> => ({
  body: data,
  status: 404,
});
