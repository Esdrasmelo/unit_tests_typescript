import { IUser, IUserAdd } from "../user/user.type";
import { IBaseRepositoryPort } from ".";

export interface IUserRepositoryPort extends IBaseRepositoryPort<IUser, IUserAdd> {
  FindByEmail: (email: string) => Promise<IUser | undefined>;
}
