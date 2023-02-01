export interface IBaseRepositoryPort<Model, InputDataType> {
  FindAll: () => Promise<Model[]>;
  FindById: (id: string) => Promise<Model | undefined>;
  Create: (inputData: InputDataType) => Promise<Model>;
  Update: (id: string, inputData: Partial<Model>) => Promise<Model>;
  Delete: (id: string) => Promise<Model>;
}
