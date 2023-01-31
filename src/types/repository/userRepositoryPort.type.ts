import { IUser, IUserAdd, IUserUpdate } from "../user/user.type";

export interface IUserRepositoryPort {
  findAllUsers: () => Promise<IUser[]>;
  findUserByEmail: (email: string) => Promise<IUser | undefined>;
  findUserById: (userId: string) => Promise<IUser | undefined>;
  createUser: (inputData: IUserAdd) => Promise<IUser>;
  updateUser: (id: string, inputData: IUserUpdate) => Promise<IUser>;
  deleteUser: (id: string) => Promise<IUser>;
}
