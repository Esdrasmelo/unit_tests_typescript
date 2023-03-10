import {
  badRequestResponse,
  createdResponse,
  notFoundResponse,
  okResponse,
} from "../protocols/http.protocols";
import {
  IHttpResponse,
  IUser,
  IUserAdd,
  IUserRepositoryPort,
  IUserUpdate,
} from "../types";

export class UserService {
  private userRepositoryPort: IUserRepositoryPort;

  constructor(repositoryPort: IUserRepositoryPort) {
    this.userRepositoryPort = repositoryPort;
  }

  public IsBirthdateValid(birthdate: Date): boolean {
    const currentDate = new Date();

    if (currentDate >= birthdate) return true;

    return false;
  }

  public async UserExistsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepositoryPort.FindByEmail(email);

    if (user) return true;

    return false;
  }

  public async UserExistsById(id: string): Promise<boolean> {
    const user = await this.userRepositoryPort.FindById(id);

    if (user) return true;

    return false;
  }

  public IsEmailValid(email: string): boolean {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return regex.test(email);
  }

  public async CreateUser(
    inputData: IUserAdd
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const userAlreadyExists = await this.UserExistsByEmail(inputData.email);

      if (userAlreadyExists) {
        return badRequestResponse<string>("User already exists");
      }

      const validateBirthdate = this.IsBirthdateValid(inputData.birthdate);

      if (!validateBirthdate) {
        return badRequestResponse<string>("Invalid birthdate");
      }

      const isEmailValid = this.IsEmailValid(inputData.email);

      if (!isEmailValid) {
        return badRequestResponse<string>("Invalid email address");
      }

      const createdUser = await this.userRepositoryPort.Create(inputData);

      return createdResponse<IUser>(createdUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async GetAllUsers(): Promise<IHttpResponse<IUser[] | string>> {
    try {
      const getUsers = await this.userRepositoryPort.FindAll();

      if (!getUsers.length) {
        return notFoundResponse<string>("Users not found");
      }

      return okResponse<IUser[]>(getUsers);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async UpdateUser(
    userId: string,
    inputData: IUserUpdate
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const userExists = await this.userRepositoryPort.FindById(userId);

      if (!userExists) {
        return notFoundResponse<string>("User does not exist");
      }

      const isEmailValid =
        !!inputData.email && this.IsEmailValid(inputData.email);

      if (!isEmailValid) {
        return badRequestResponse<string>("Invalid email address");
      }

      const isBirthdateValid =
        !!inputData.birthdate && this.IsBirthdateValid(inputData.birthdate);

      if (!isBirthdateValid) {
        return badRequestResponse<string>("Invalid birthdate");
      }

      const updatedUser = await this.userRepositoryPort.Update(
        userId,
        inputData
      );

      return okResponse<IUser>(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  }
}
