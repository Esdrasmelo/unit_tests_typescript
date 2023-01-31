import { IUser, IUserAdd, IUserRepositoryPort } from "../types";

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

  public async UserAlreadyExists(email: string): Promise<boolean> {
    const user = await this.userRepositoryPort.findUserByEmail(email);

    if (user) return true;

    return false;
  }

  public IsEmailValid(email: string): boolean {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return regex.test(email);
  }

  public async CreateUser(input_data: IUserAdd): Promise<IUser> {
    try {
      const validateBirthdate = this.IsBirthdateValid(input_data.birthdate);
      const userAlreadyExists = await this.UserAlreadyExists(input_data.email);
      const isEmailValid = this.IsEmailValid(input_data.email);

      if (!validateBirthdate) {
        throw new Error("Invalid birthdate");
      }

      if (!isEmailValid) {
        throw new Error("Invalid email address");
      }

      if (userAlreadyExists) {
        throw new Error("User already exists");
      }

      const createdUser = await this.userRepositoryPort.createUser(input_data);

      return createdUser;
    } catch (error) {
      return error;
    }
  }
}
