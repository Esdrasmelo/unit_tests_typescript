import {
  badRequestResponse,
  createdResponse,
} from "../protocols/http.protocols";
import { IHttpResponse } from "../types";
import {
  IBankAccounUpdate,
  IBankAccount,
  IBankAccountAdd,
} from "../types/bankAccount";
import { IBankAccountRepositoryPort } from "../types/repository/bankAccountRepositoryPort.type";

export class BankAccountService {
  private bankAccountRepositoryPort: IBankAccountRepositoryPort;

  constructor(bankAccountRepositoryPort: IBankAccountRepositoryPort) {
    this.bankAccountRepositoryPort = bankAccountRepositoryPort;
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

      if (bankAccountAlreadyExists) {
        return badRequestResponse(
          "A bank account for this account number already exists"
        );
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
