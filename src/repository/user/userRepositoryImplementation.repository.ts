import { randomUUID } from "crypto";
import { IUser, IUserAdd, IUserRepositoryPort, IUserUpdate } from "../../types";

export class UserRepositoryImplementation implements IUserRepositoryPort {
  private userDatabase: IUser[] = [];

  async findAllUsers(): Promise<IUser[]> {
    try {
      return this.userDatabase;
    } catch (error) {
      return error;
    }
  }

  async findUserByEmail(email: string): Promise<IUser | undefined> {
    try {
      const user = this.userDatabase.find((user) => user.email === email);

      return user;
    } catch (error) {
      return error;
    }
  }

  async createUser(input_data: IUserAdd): Promise<IUser> {
    try {
      this.userDatabase.push({
        ...input_data,
        id: randomUUID(),
        created_at: new Date(),
        updated_at: new Date(),
      });

      const user = this.userDatabase.find(
        (user) => user.email === input_data.email
      );

      return user!;
    } catch (error) {
      return error;
    }
  }
  async updateUser(id: string, input_data: IUserUpdate): Promise<IUser> {
    try {
      const userIndex = this.userDatabase.indexOf(
        this.userDatabase.find((user) => user.id === id)!
      );

      this.userDatabase[userIndex] = {
        ...input_data,
        ...this.userDatabase[userIndex],
      };

      return this.userDatabase[userIndex];
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string): Promise<IUser> {
    const user = this.userDatabase.find((user) => user.id === id)!;

    const userIndex = this.userDatabase.indexOf(user);

    this.userDatabase.splice(userIndex, 1);

    return user;
  }
}
