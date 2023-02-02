import { randomUUID } from "crypto";
import { IUser, IUserAdd, IUserRepositoryPort, IUserUpdate } from "../../../../src/types";

export class TestUserRepository implements IUserRepositoryPort {
  private userDatabase: IUser[] = [];

  async FindAll(): Promise<IUser[]> {
    try {
      return this.userDatabase;
    } catch (error) {
      throw new Error(error);
    }
  }

  async FindByEmail(email: string): Promise<IUser | undefined> {
    try {
      const user = this.userDatabase.find((user) => user.email === email);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async FindById(userId: string): Promise<IUser | undefined> {
    try {
      const user = this.userDatabase.find((user) => user.id === userId);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async Create(inputData: IUserAdd): Promise<IUser> {
    try {
      const generatedId = randomUUID();

      this.userDatabase.push({
        ...inputData,
        id: generatedId,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const user = this.userDatabase.find((user) => user.id === generatedId);

      return user!;
    } catch (error) {
      throw new Error(error);
    }
  }

  async Update(userId: string, inputData: IUserUpdate): Promise<IUser> {
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

  async Delete(id: string): Promise<IUser> {
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
