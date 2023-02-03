import {
  badRequestResponse,
  createdResponse,
  notFoundResponse,
} from "../protocols/http.protocols";
import { IHttpResponse, IUserRepositoryPort } from "../types";
import {
  IBankAccounUpdate,
  IBankAccount,
  IBankAccountAdd,
} from "../types/bankAccount";
import { IBankAccountRepositoryPort } from "../types/repository/bankAccountRepositoryPort.type";
import { UserService } from "./user.service";

export class BankAccountService {
  private bankAccountRepositoryPort: IBankAccountRepositoryPort;
  private userService: UserService;

  constructor(
    bankAccountRepositoryPort: IBankAccountRepositoryPort,
    userService: UserService
  ) {
    this.bankAccountRepositoryPort = bankAccountRepositoryPort;
    this.userService = userService;
  }

  async BankAccountExists(accountNumber: string): Promise<boolean> {
    try {
      const bankAccount =
        await this.bankAccountRepositoryPort.FindByAccountNumber(accountNumber);

      if (bankAccount) return true;

      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  async CreateBankAccount(
    inputData: IBankAccountAdd
  ): Promise<IHttpResponse<IBankAccount | string>> {
    try {
      const bankAccountAlreadyExists = await this.BankAccountExists(
        inputData.accountNumber
      );
      const ownerExists = await this.userService.UserExistsById(
        inputData.owner_id
      );

      if (bankAccountAlreadyExists) {
        return badRequestResponse(
          "A bank account for this account number already exists"
        );
      }

      if (!ownerExists) {
        return notFoundResponse("Owner does not exist");
      }

      if (inputData.amountToBeDeposited === 0) {
        return badRequestResponse<string>(
          "You must deposit to be able to create a bank account"
        );
      }

      const createdBankAccount = await this.bankAccountRepositoryPort.Create(
        inputData
      );

      return createdResponse<IBankAccount>(createdBankAccount);
    } catch (error) {
      throw new Error(error);
    }
  }
}
