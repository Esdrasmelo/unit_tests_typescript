import { randomUUID } from "crypto";
import { IUser, IUserAdd, IUserRepositoryPort, IUserUpdate } from "../../types";

export class UserRepositoryImplementation implements IUserRepositoryPort {
  private userDatabase: IUser[] = [];

  async findAllUsers(): Promise<IUser[]> {
    try {
      return this.userDatabase;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string): Promise<IUser | undefined> {
    try {
      const user = this.userDatabase.find((user) => user.email === email);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserById(userId: string): Promise<IUser | undefined> {
    try {
      const user = this.userDatabase.find((user) => user.id === userId);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(inputData: IUserAdd): Promise<IUser> {
    try {
      this.userDatabase.push({
        ...inputData,
        id: randomUUID(),
        created_at: new Date(),
        updated_at: new Date(),
      });

      const user = this.userDatabase.find(
        (user) => user.email === inputData.email
      );

      return user!;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(userId: string, inputData: IUserUpdate): Promise<IUser> {
    try {
      const userIndex = this.userDatabase.indexOf(
        this.userDatabase.find((user) => user.id === userId)!
      );

      this.userDatabase[userIndex] = {
        ...inputData,
        ...this.userDatabase[userIndex],
      };

      return this.userDatabase[userIndex];
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: string): Promise<IUser> {
    try {
      const user = this.userDatabase.find((user) => user.id === id)!;

      const userIndex = this.userDatabase.indexOf(user);

      this.userDatabase.splice(userIndex, 1);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
