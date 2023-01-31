import { IUser, IUserAdd, IUserUpdate } from "../user/user.type";

export interface IUserRepositoryPort {
  findAllUsers: () => Promise<IUser[]>;
  findUserByEmail: (email: string) => Promise<IUser | undefined>;
  createUser: (input_data: IUserAdd) => Promise<IUser>;
  updateUser: (iid: string, input_data: IUserUpdate) => Promise<IUser>;
  deleteUser: (id: string) => Promise<IUser>;
}
