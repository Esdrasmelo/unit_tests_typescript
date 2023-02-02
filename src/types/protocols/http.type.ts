export interface IHttpResponse<BodyType> {
  body: BodyType;
  status: number;
}
