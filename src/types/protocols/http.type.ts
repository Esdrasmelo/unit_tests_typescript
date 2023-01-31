export interface HttpResponse<BodyType> {
  body: BodyType;
  status: number;
}
